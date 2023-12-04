import React from "react"
import { Button, Icon, LoadingBar, Navigation as Menu, Text } from "../../../components"
import { Container, ContainerAmount, Amount } from "./styles"
import { Refactoring, whatsapp } from "../../../utils"
import Toast from "react-native-toast-message"

import Profile from "./profile"

export default function Header(props) {

  const amount = 69.35
  const loadingAmount = false

  const money = (value) => Refactoring.format.money(true, value)

  const navigation = [
    {
      icon: "whatsapp",
      label: "Suporte",
      function: () => whatsapp("48999100598"),
    },
  ]

  return (
    <Container zIndex={props.zIndex}>
      <Profile navigation={props.navigation} />
      <ContainerAmount>
        <Amount>
          <Text>Seu saldo</Text>
          {loadingAmount
          ? <LoadingBar height={18} width={100} mt={3} white />
          : <Text bold size={15.5}>{money(amount || "0.00")}</Text>}
        </Amount>
        <Button 
          label={{ text: "recarregar", size: 12 }} 
          color="white-15" 
          padding="8px 15px" 
          width="100px" 
          margin="0"
        />
      </ContainerAmount>
      <Menu content={navigation} />
    </Container>
  );
}
