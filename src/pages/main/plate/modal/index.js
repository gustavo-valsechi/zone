import React, { useRef } from "react"
import { Container } from "./styles"
import { Form, Modal } from "../../../../components"
import * as Yup from "yup"

export default function ModalPlate(props) {
  const formRef = useRef({})

  const onClose = () => {
    props.toggle.set(false)
  }

  const onSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        plate: Yup.string().min(7, "Mínimo 7 caracteres!").required("Campo obrigatório!")
      })

      await schema.validate(data, { abortEarly: false })

      formRef.current.setErrors({})

      const content = [{ plate: data.plate }, ...props.content.value]

      props.content.set(content)

      onClose()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach((error) => errorMessages[error.path] = error.message)

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  return (
    <Modal
      isVisible={props.toggle.value}
      onBackdropPress={onClose}
      title="Adicionar placa"
    >
      <Container>
        <Form 
          formRef={formRef}
          onSubmit={onSubmit}
          inputs={[{
            name: "plate",
            label: "Placa",
            maxLength: 7,
          }]}
          buttons={[{
            label: "adicionar",
            onPress: () => formRef.current.submitForm()
          }]}
        />
      </Container>
    </Modal>
  )
}