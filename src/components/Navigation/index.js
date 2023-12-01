import React from 'react'
import { Container, Pressable, Soon } from './styles'
import Text from '../Text'
import Icon from '../Icon'
import _ from 'lodash'

export default function Navigation(props) {
  return (
    <Container>
      {_.map(props.content, (data, index) =>
        <Pressable key={index} disabled={data.disabled} onPress={!data.disabled && data.function}>
          <Icon pack='fontAwesome5' size={20} icon={data.icon} color={data.disabled ? 'white-5' : 'white'} />
          <Text color={data.disabled ? 'white-5' : 'white'} lines={2}>{data.label}</Text>
          {!!data.soon && <Soon><Text size={9} color='primary'>em breve</Text></Soon>}
        </Pressable>
      )}
    </Container>
  )
}
