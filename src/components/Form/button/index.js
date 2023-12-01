import React from 'react'
import { Analytics } from '../../../core'
import { Refactoring } from '../../../utils'
import { Button, Loading } from './styles'
import Text from '../../Text'
import Icon from '../../Icon'
import _ from 'lodash'

export default function Buttons(props) {

  const onPress = async () => {
    if (props.disabled || props.loading) return

    if (props.onPress) props.onPress()

    const analytics = props.analytics || {}

    if (analytics.enabled === false) return

    const label = props.label?.text || props.label || ""
    const complement = analytics.complement ? `_${analytics.complement}` : ""

    const event = Refactoring.format.event(`botao_${label}${complement}`)

    await Analytics.event(event, { ...analytics.content })
  }

  return (
    <Button
      disabled={!!props.disabled || props.loading}
      padding={props.padding}
      margin={props.margin}
      width={props.width}
      onPress={onPress}
      color={props.color}
      activeOpacity={0.85}
      borderRadius={props.borderRadius}
    >
      {!!props.loading && <Loading color={props.label?.color || "#fff"} />}
      {!!props.icon && <Icon mr={10} pack={props.icon?.pack || 'fontAwesome5'} size={props.icon?.size || 12.5} color={props.icon?.color} bold icon={props.icon?.name || props.icon} />}
      {!!props.label && <Text size={props.label?.size || 14} color={props.label?.color} bold>{props.label?.text || props.label}</Text>}
      {!!props.label?.timer && <Text size={props.label?.size || 14} color={props.label?.color} ml={5}>{props.label?.timer}s</Text>}
    </Button>
  )
}
