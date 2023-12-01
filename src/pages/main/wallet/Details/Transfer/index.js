import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Container, Form, Text } from '../../../../../components'
import { ContainerAmount, ContainerContent, ContainerCustomer, ContainerPhoto, ContainerTransfer, Content, Scroll } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { Refactoring } from '../../../../../utils'
import * as Yup from 'yup'
import _ from 'lodash'

import WalletActions from '../../../../../store/ducks/wallet'

export default function Transfer({ navigation }) {
  const dispatch = useDispatch()
  const formRef = useRef({})

  const { 
    walletDetails, 
    walletTransferCustomer: customer,
    loadingWalletTransferCustomer,
    loadingWalletTransfer
  } = useSelector((state) => state.wallet)

  const { profile } = useSelector((state) => state.profile)

  const [phone, setPhone] = useState("")
  const [value, setValue] = useState("")
  const [show, setShow] = useState(false)

  const transfer = Number(Refactoring.removeMask.money(value))
  const amount = Number(walletDetails.company?.saldo)

  useEffect(() => {
    const formattedPhone = Refactoring.removeMask.phone(phone)

    if (formattedPhone.length < 11 || formattedPhone === profile.telefone) return

    dispatch(WalletActions.walletTransferCustomerRequest({ phone: formattedPhone }))
  }, [dispatch, phone, profile])

  useEffect(() => {
    if (!formRef.current) return

    const errors = formRef.current.getErrors()
    const formattedPhone = Refactoring.removeMask.phone(phone)

    if (formattedPhone !== profile.telefone) return formRef.current.setErrors({ ...errors, phone: "" })

    formRef.current.setErrors({ ...errors, phone: "Não é permitido transferir para si mesmo" })
  }, [dispatch, phone, profile])

  useEffect(() => {
    if (!formRef.current) return

    const errors = formRef.current.getErrors()

    if (transfer <= amount) return formRef.current.setErrors({ ...errors, value: "" })

    formRef.current.setErrors({ ...errors, value: "Valor de transferência maior que o seu saldo" })
  }, [dispatch, transfer, amount])

  async function handleSubmit(data) {

    data.value = Number(Refactoring.removeMask.money(data.value))

    try {
      const schema = Yup.object().shape({
        phone: Yup.string().matches(/^(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((9\d|9)\d{4})-?(\d{4}))$/, 'Telefone está incorreto').required('Campo obrigatório!'),
        value: Yup.number().min(0.01, 'Mínimo R$ 0,01').required('Campo obrigatório!').typeError('Campo obrigatório!'),
        password: Yup.string().required('Campo obrigatório!'),
      })

      await schema.validate(data, { abortEarly: false })

      formRef.current.setErrors({})

      const body = {
        id_company: walletDetails.company?.id,
        id_customer: customer?.id,
        value: data.value,
        password: data.password
      }

      dispatch(WalletActions.walletTransferRequest(body, navigation))
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}
        err.inner.forEach((error) => {
        errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  return (
    <Container
      header={{
        title: "Transferir cashback",
        left: {
          function: navigation.goBack,
          icon: 'chevron-left'
        }
      }}
    >
      <ContainerAmount>
        <Text color="secondary" weight={600} mr={10} size={15}>Seu saldo:</Text>
        <Text color="primary" bold size={15}>{Refactoring.format.money(true, amount || "0.00", 'BRL')}</Text>
      </ContainerAmount>
      <ContainerTransfer>
        <Scroll>
          {!!customer?.id &&
            <ContainerCustomer>
              <ContainerPhoto>
                <Avatar size={50} source={customer?.photo} />
              </ContainerPhoto>
              <ContainerContent>
                <Text color="secondary" bold>
                  {customer?.name || Refactoring.mask.phone(customer?.phone)}
                </Text>
                {((!!customer?.phone && !!customer?.name) || !!customer?.document_number) &&
                  <Content>
                    {!!customer?.phone && !!customer?.name &&
                      <Text color="secondary" weight={500} size={11}>
                        <Text color="secondary" size={11}>{Refactoring.mask.phone(customer?.phone)}</Text>
                      </Text>}
                    {!!customer?.document_number &&
                      <Text color="secondary" weight={500} size={11}>
                        <Text color="secondary" size={11}>{Refactoring.mask.docNumber(customer?.document_number)}</Text>
                      </Text>}
                  </Content>}
              </ContainerContent>
            </ContainerCustomer>}
          <Form 
            formRef={formRef}
            onSubmit={handleSubmit}
            inputs={[
              { 
                name: "phone", 
                label: "Telefone",
                placeholder: 'Ex.: (00) 90000-0000', 
                maxLength: 15, 
                value: phone, 
                onChangeText: (value) => {
                  setPhone(Refactoring.mask.phone(value))
                  dispatch(WalletActions.walletTransferCustomerSuccess({}))
                },
                keyboardType: "numeric",
                disabled: loadingWalletTransferCustomer || loadingWalletTransfer
              },
              { 
                name: "value", 
                label: "Valor", 
                placeholder: 'Ex.: R$ 0,01',
                maxLength: 15,
                value: value, 
                onChangeText: (value) => setValue(Refactoring.mask.money(value)),
                keyboardType: "numeric",
                disabled: loadingWalletTransfer
              },
              {
                name: 'password',
                label: 'Senha',
                maxLength: 255,
                placeholder: '••••••••••••••',
                type: show ? 'text' : 'password',
                disabled: loadingWalletTransfer,
                icon: {
                  name: show ? 'eye-slash' : 'eye',
                  function: () => setShow(!show)
                }
              }
            ]}
            buttons={[
              { 
                label: "transferir", 
                disabled: transfer > amount || loadingWalletTransferCustomer || loadingWalletTransfer || !customer?.id,
                loading: loadingWalletTransfer,
                onPress: () => formRef.current.submitForm()
              }
            ]}
          />
        </Scroll>
      </ContainerTransfer>
    </Container>
  )
}
