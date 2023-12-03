import React from 'react'
import { Button, Icon, LoadingBar, Navigation as Menu, Text } from '../../../components'
import { Container, ContainerAmount, Amount } from './styles'
import { Refactoring, whatsapp } from '../../../utils'
import Toast from "react-native-toast-message"

import Profile from './profile'

export default function Header(props) {

  const amount = 69.35
  const loadingAmount = false

  const money = (value) => Refactoring.format.money(true, value)

  const navigation = [
    {
      icon: 'map-marker-alt',
      label: 'Locais',
      function: () => props.navigation.navigate('Location'),
    },
    {
      icon: 'ticket-alt',
      label: 'Cupons',
      function: () => props.navigation.navigate('Coupons'),
    },
    {
      icon: 'heart',
      label: 'Fale conosco',
      function: () => whatsapp('4834139822'),
    },
    {
      icon: 'gift',
      label: 'Indique',
      function: () => props.navigation.navigate('Indicate'),
    },
    {
      icon: 'headset',
      label: 'Suporte',
      function: () => props.navigation.navigate('WebView', { 
        title: "Suporte", 
        url: "https://nummus.atlassian.net/servicedesk/customer/portal/2" 
      }),
    },
  ]

  return (
    <Container zIndex={props.zIndex}>
      <Profile navigation={props.navigation} />
      <ContainerAmount>
        <Amount 
          onPress={() => Toast.show({ 
            type: 'info', 
            text1: 'Cashback total', 
            text2: 'Seu crédito de cashback em todos os estabelecimentos'
          })}
        >
          <Text>Cashback total <Icon pack="fontAwesome5" icon="info-circle" size={10} /></Text>
          {loadingAmount
          ? <LoadingBar height={18} width={100} mt={3} white />
          : <Text bold size={15.5}>{money(amount || "0.00")}</Text>}
        </Amount>
        {/* <Button 
          label={{ text: "extrato", size: 13 }} 
          color="white-15" 
          padding="10px 15px" 
          width="100px" 
          margin="0"
        /> */}
      </ContainerAmount>
      <Menu content={navigation} />
    </Container>
  );
}
