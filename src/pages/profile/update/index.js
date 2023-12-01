import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Container, Form, Icon } from '../../../components'
import { AlterPhoto, ContainerPhoto, ContainerProfile } from './styles'
import { useDispatch, useSelector } from "react-redux"
import { Refactoring } from '../../../utils'
import * as Yup from "yup"
import _ from 'lodash'

import ProfileActions from '../../../store/ducks/profile'

import ModalPhoto from './photo'

const GENDER_OPTIONS = [
  { "Masculino": "M" },
  { "Feminino": "F" },
  { "Não informar": "N/I" },
]

export default function ProfileUpdate({ navigation }) {
  const dispatch = useDispatch()
  const formRef = useRef({})

  const { profile, loadingUpdateProfile } = useSelector((state) => state.profile)

  const [modalPhoto, setModalPhoto] = useState(false)
  const [photo, setPhoto] = useState(null)

  const [gender, setGender] = useState("N/I")

  useEffect(() => {
    if (!formRef.current) return

    formRef.current.reset()
    formRef.current.setErrors({})
    
    setTimeout(() => {
      formRef.current.setData({
        name: profile.nome || "",
        phone: Refactoring.mask.phone(profile.telefone) || "",
        document_number: Refactoring.mask.docNumber(profile.cpf_cnpj) || "",
        email: profile.email || "",
        birthdate: Refactoring.format.date(profile.dt_nasc) || "",
        gender: profile.genero || "N/I",
      })
  
      setGender(profile.genero || "N/I")
    }, 100)
  }, [formRef])

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório!'),
        email: Yup.string().email("E-mail inválido!").required('Campo obrigatório!'),
        gender: Yup.string().required('Campo obrigatório!'),
      })

      await schema.validate(data, { abortEarly: false })

      formRef.current.setErrors({})

      const body = {
        photo,
        nome: data.name,
        email: data.email.toLowerCase(),
        genero: data.gender,
      }

      dispatch(ProfileActions.updateProfileRequest(body, navigation))
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
        title: 'Alterar perfil',
        left: {
          function: navigation.goBack,
          icon: 'chevron-left'
        }
      }}
    >
      <ModalPhoto 
        modal={{ value: modalPhoto, set: setModalPhoto }} 
        photo={{ value: photo, set: setPhoto }} 
      />
      <ContainerProfile>
        <ContainerPhoto onPress={() => setModalPhoto(true)}>
          <Avatar size={80} source={photo?.uri || profile.foto_url} />
          <AlterPhoto>
            <Icon icon="sync-alt" pack="fontAwesome5" size={13} color="primary" />
          </AlterPhoto>
        </ContainerPhoto>
        <Form 
          formRef={formRef}
          onSubmit={handleSubmit}
          inputs={[
            { name: "name", label: "Nome" },
            { name: "phone", label: "Telefone", disabled: true, icon: { name: 'sync-alt', function: () => navigation.navigate('ProfilePassword') }},
            { name: "document_number", label: "CPF/CNPJ", disabled: true },
            { name: "email", label: "E-mail", keyboardType: 'email-address', maxLength: 150 },
            { name: "birthdate", label: "Data de nascimento", disabled: true },
            { name: "gender", label: "Gênero", type: "select", value: gender, options: GENDER_OPTIONS },
          ]}
          buttons={[
            { 
              label: "salvar", 
              loading: loadingUpdateProfile, 
              onPress: () => formRef.current.submitForm(),
              analytics: { complement: "perfil" },
            }
          ]}
        />
      </ContainerProfile>
    </Container>
  )
}