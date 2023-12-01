import React, { useRef, useState } from 'react'
import { Container, Form } from '../../../components'
import { ContainerPassword } from './styles'
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import _ from 'lodash'

import ProfileActions from '../../../store/ducks/profile'

export default function ChangePassword({ navigation }) {
  const dispatch = useDispatch()
  const formRef = useRef({})

  const { loadingChangePassword } = useSelector((state) => state.profile)

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showNewConfirm, setShowNewConfirm] = useState(false)

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        current_password: Yup.string().min(6, 'Mínimo 6 caracteres').max(20, 'Máximo 20 caracteres').required('Campo obrigatório!'),
        new_password: Yup.string().min(6, 'Mínimo 6 caracteres').max(20, 'Máximo 20 caracteres').required('Campo obrigatório!'),
        new_password_confirm: Yup.string().oneOf([Yup.ref('new_password'), null],'Confirmação inválida!').required('Campo obrigatório!'),
      })

      await schema.validate(data, { abortEarly: false })

      formRef.current.setErrors({})

      const body = {
        senhaAntiga: data.current_password,
        senha: data.new_password,
        senhaConfirmacao: data.new_password_confirm
      }

      dispatch(ProfileActions.changePasswordRequest(body, navigation))
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
        title: 'Alterar senha',
        left: {
          function: navigation.goBack,
          icon: 'chevron-left'
        }
      }}
    >
      <ContainerPassword>
        <Form 
          formRef={formRef}
          onSubmit={handleSubmit}
          inputs={[
            {
              name: 'current_password',
              label: 'Senha antiga',
              maxLength: 20,
              placeholder: '••••••••••••••',
              type: showCurrent ? 'text' : 'password',
              icon: {
                name: showCurrent ? 'eye-slash' : 'eye',
                function: () => setShowCurrent(!showCurrent)
              }
            },
            {
              name: 'new_password',
              label: 'Senha nova',
              maxLength: 20,
              placeholder: '••••••••••••••',
              type: showNew ? 'text' : 'password',
              icon: {
                name: showNew ? 'eye-slash' : 'eye',
                function: () => setShowNew(!showNew)
              }
            },
            {
              name: 'new_password_confirm',
              label: 'Confirmação da senha nova',
              maxLength: 20,
              placeholder: '••••••••••••••',
              type: showNewConfirm ? 'text' : 'password',
              icon: {
                name: showNewConfirm ? 'eye-slash' : 'eye',
                function: () => setShowNewConfirm(!showNewConfirm)
              }
            }
          ]}
          buttons={[
            { 
              label: "alterar senha",
              loading: loadingChangePassword,
              onPress: () => formRef.current.submitForm()
            },
            { 
              label: { text: "cancelar", color: "secondary" }, 
              color: "white-0", 
              disabled: loadingChangePassword,
              onPress: () => navigation.navigate('Profile'),
              analytics: { complement: "alterar_senha" },
            },
          ]}
        />
      </ContainerPassword>
    </Container>
  )
}