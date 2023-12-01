import React, { useEffect } from 'react'
import Modal from '../../Modal'
import Form from '../../Form'
import { Container } from './styles'

export default function ModalFilter(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onClose}
      title="Filtros"
      buttons={[
        {
          label: 'filtrar',
          onPress: () => props.formRef.current.submitForm(),
          hide: !props.onSubmit,
          analytics: { 
            complement: props.location,
            content: props.formRef?.current?.getData ? props.formRef.current.getData() : {}
          }
        },
        {
          label: 'resetar',
          onPress: () => {
            props.onClear()
            setTimeout(() => props.formRef.current.submitForm(), 10)
          },
          hide: !props.onClear,
          analytics: { enabled: false },
        },
        {
          color: 'black-0',
          label: { text: 'fechar', color: 'secondary' },
          onPress: props.onClose,
          analytics: { enabled: false },
        },
      ]}>
      <Container>
        <Form
          margin='0px'
          formRef={props.formRef}
          onSubmit={props.onSubmit}
          inputs={props.inputs}
        />
      </Container>
    </Modal>
  )
}
