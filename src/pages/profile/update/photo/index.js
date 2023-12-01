import React from 'react'
import { Container } from './styles'
import { Modal, Text } from '../../../../components'
import * as ImagePicker from 'expo-image-picker'

export default function ModalPhoto(props) {

  const close = () => {
    props.modal.set(false)
  }

  const gallery = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    
    if (response.canceled || !response.assets) return

    props.photo.set(response.assets[0])
    close()
  }

  const camera = async () => {
    const response = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (response.canceled || !response.assets) return

    props.photo.set(response.assets[0])
    close()
  }

  return (
    <Modal 
      isVisible={props.modal.value}
      onBackdropPress={close}
      title="Escolher imagem"
      buttons={[
        { label: "galeria", onPress: gallery },
        { label: { text: "tirar foto", color: "primary" }, color: "tertiary", onPress: camera },
        { label: { text: "cancelar", color: "secondary" }, color: "white-0", onPress: close, analytics: { enabled: false } },
      ]}
    >
      <Container>
        <Text color="black-6" lines={4} align="center">
          Você pode escolher uma imagem da sua galeria ou tirar uma foto com a câmera
        </Text>
      </Container>
    </Modal>
  )
}