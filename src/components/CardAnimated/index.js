import React from "react"
import { Container, ContainerCard, Indicator, ContainerUser, ContainerLabel } from "./styles"
import { PanGestureHandler } from 'react-native-gesture-handler'
import { withSpring, withTiming, useSharedValue, useAnimatedStyle, useAnimatedGestureHandler } from 'react-native-reanimated'
import { Refactoring } from "../../utils"
import Text from '../Text'
import Avatar from '../Avatar'

export default function GlobalCardAnimated(props) {

  const mask = (type, value) => Refactoring.mask[type](value)

  const translateX = useSharedValue(props.animate?.init || 0)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.start = translateX.value

      if (translateX.value > 0 && !!props.initOnFocus) translateX.value = withTiming(props.animate?.min || 0)
    },
    onActive: (event, ctx) => {
      translateX.value = Math.min(Math.max(ctx.start + event.translationX, props.animate?.min || 0), (props.animate?.max || 65) + 30)
    },
    onEnd: (event, ctx) => {
      if (event.translationX < ((props.animate?.max || 40) / 2)) return translateX.value = withTiming(props.animate?.min || 0)

      translateX.value = withSpring((props.animate?.max || 65), { stiffness: 150, mass: 0.4 })
    }
  })

  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    }
  }, [])

  return (
    <PanGestureHandler enabled={props.animate?.enabled} activeOffsetX={[-10, 10]} onGestureEvent={gestureHandler}>
      <Container style={[animateStyle]}>
        <ContainerCard p={props.padding} m={props.margin} {...props}>
          {props.customer &&
            <ContainerUser>
              <Avatar source={props.customer.photo || props.customer.photo_url || props.customer.foto_url} />
              <ContainerLabel>
                <Text scratched={props.customer.scratched} color='secondary' bold>
                  {props.customer.name || 'Cadastro rápido'}
                </Text>
              </ContainerLabel>
            </ContainerUser>}
          {props.children}
        </ContainerCard>
        {!!props.indicator && <Indicator {...props.indicator} />}
      </Container>
    </PanGestureHandler>
  )
}
