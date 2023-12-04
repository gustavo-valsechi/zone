import React from "react"
import { Arrow, Container, Content } from "./styles"
import { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"
import { Dimensions } from "react-native"

export default function Tooltip(props) {

    const width = Dimensions.get("window").width

    const translateX = useSharedValue(props.animate?.init || 0)

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.start = translateX.value
        },
        onActive: (event, ctx) => {
            if (!props.onClose) return translateX.value = withTiming(0)

            translateX.value = Math.min(Math.max(ctx.start + event.translationX, (width * -1)), width)
        },
        onEnd: (event, ctx) => {
            if (!props.onClose) return translateX.value = withTiming(0)

            if (Math.abs(event.translationX) < (width / 2)) return translateX.value = withTiming(0)

            translateX.value = withSpring(event.translationX > 0 ? width : (width * -1), { stiffness: 150, mass: 0.4 })
        
            if (props.onClose) runOnJS(props.onClose)()
        }
    })

    const animateStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    }, [])

    return (
        <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={gestureHandler}>
            <Container style={[animateStyle]} {...props}>
                <Content {...props}>
                    <Arrow {...props} />
                    {props.children}
                </Content>
            </Container>
        </PanGestureHandler>
    )
}
