import { Platform, Linking } from "react-native"

const whatsapp = (phone, message) => {
  const text = encodeURI(message || `Olá, tudo bem?`)

  if (Platform.OS === "ios") {
    return Linking.openURL(`https://api.whatsapp.com/send?phone=55${phone}&text=${text}`)
  }

  Linking.canOpenURL(`whatsapp://send?text=${text}`).then(supported => {

    if (supported) {
      return Linking.openURL(`whatsapp://send?phone=55${phone}&text=${text}`)
    } else {
      return Linking.openURL(`https://api.whatsapp.com/send?phone=55${phone}&text=${text}`)
    }
    
  })
}

module.exports = { whatsapp }
