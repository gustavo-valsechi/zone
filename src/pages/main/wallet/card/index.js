import React from 'react'
import { Avatar, Card, Icon, RescuePolicy, Text } from '../../../../components'
import { Container, ContainerAmount, ContainerContent, ContainerCoupon, ContainerLogo, ContainerRule, Content } from './styles'
import { Refactoring } from '../../../../utils'
import _ from 'lodash'

export default function WalletCard(props) {

  const money = (value) => Refactoring.format.money(true, value)

  const details = () => {
    if (props.company?.economic_group && props.company?.photo?.length > 1) 
      return props.navigation.navigate("WalletGroup", { groupId: props.company?.economic_group })

    props.navigation.navigate("WalletDetails", { uuid: props.company?.uuid })
  }

  return (
    <Card padding="15px" margin="0 0 10px" onPress={details}>
      <Container>
        <ContainerLogo group={_.isArray(props.company?.photo) && props.company?.photo?.length > 1}>
          <Avatar icon="store" size={55} source={props.company?.photo} />
        </ContainerLogo>
        <ContainerContent>
          <Text bold color="secondary" lines={5}>
            {_.isArray(props.company?.photo) && props.company?.photo?.length > 1
            ? props.company?.name + ' & outros'
            : props.company?.name}
          </Text>
          <Content>
            <ContainerRule>
              <Text size={12} weight={600} color="secondary">Política de resgate</Text>
              <Text size={11} color="secondary" lines={5}>
                {_.isArray(props.company?.photo) && props.company?.photo?.length > 1
                ? <>Cada estabelecimento do grupo possui políticas de resgate distintas</>
                : <RescuePolicy content={props.company} />}
              </Text>
            </ContainerRule>
            <ContainerAmount>
              <Text size={12} weight={600} color="secondary">Saldo</Text>
              <Text size={12} weight={900} color="primary" lines={5} align="right">{money(props.balance || "0.00")}</Text>
            </ContainerAmount>
          </Content>
          {!!props.coupon && (!_.isArray(props.company?.photo) || props.company?.photo?.length === 1) && 
            <ContainerCoupon>
              <Icon pack="fontAwesome5" icon="ticket-alt" color="primary" size={13} mr={5} /> 
              <Text color="secondary" size={12} weight={500}>
                Cupom de <Text color="primary" size={12} weight={700}>{money(props.coupon || '0.00')}</Text> disponível
              </Text>
            </ContainerCoupon>}
        </ContainerContent>
      </Container>
    </Card>
  )
}
