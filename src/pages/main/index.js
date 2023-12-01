import React, { useState } from 'react'
import { Container, Icon, Text } from '../../components'
import { ContainerHandler, ContainerTitle, ContainerWallet } from './styles'
import { Dimensions, RefreshControl } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
// import { useDispatch, useSelector } from "react-redux"

// import ProfileActions from '../../store/ducks/profile'
// import NotificationActions from '../../store/ducks/notification'
// import WalletActions from '../../store/ducks/wallet'

// import Header from './header'
// import Wallet from './wallet'

export default function Main({ navigation }) {
  // const dispatch = useDispatch()

  // const { filtersWallet } = useSelector((state) => state.wallet)

  const [expanded, setExpanded] = useState(false)

  const HEIGHT = Dimensions.get('window').height
  const HEIGHT_CONTAINER = 270
  const TOP_DIFF_EXPANDED = 190
  const TOP = 270

  const translateY = useSharedValue(0)
  const height = useSharedValue(HEIGHT)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.start = translateY.value
    },
    onActive: (event, ctx) => {
      runOnJS(setExpanded)(true)
      translateY.value = ctx.start + event.translationY
      height.value = HEIGHT + TOP_DIFF_EXPANDED

      if (ctx.start + event.translationY < (TOP_DIFF_EXPANDED * -1))
        translateY.value = (TOP_DIFF_EXPANDED * -1)
    },
    onEnd: (event, ctx) => {
      if (event.translationY > -100) {
        runOnJS(setExpanded)(false)
        height.value = withDelay(1000, withTiming(HEIGHT))
        return translateY.value = withTiming(0)
      }

      runOnJS(setExpanded)(true)
      height.value = HEIGHT + TOP_DIFF_EXPANDED
      translateY.value = withSpring(TOP_DIFF_EXPANDED * -1, {
        stiffness: 150,
        mass: 0.4
      })
    }
  })

  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      height: height.value - HEIGHT_CONTAINER
    }
  }, [])

  const toggleTransactions = () => {
    if (expanded) {
      runOnJS(setExpanded)(false)
      height.value = withDelay(1000, withTiming(HEIGHT))
      return translateY.value = withTiming(0)
    }

    runOnJS(setExpanded)(true)
    height.value = HEIGHT + TOP_DIFF_EXPANDED
    translateY.value = withTiming(TOP_DIFF_EXPANDED * -1, {
      duration: 200,
    })
  }

  // const reload = () => {
  //   dispatch(ProfileActions.profileRequest())
  //   dispatch(WalletActions.amountRequest())
  //   dispatch(WalletActions.setFiltersWallet({...filtersWallet}))
  //   dispatch(WalletActions.setWalletPage(0))
  // }

  return (
    <Container>
      {/* <RefreshControl tintColor="#fff" enabled={!expanded} refreshing={false} onRefresh={reload}>
        <Header navigation={navigation} zIndex={expanded ? 99 : 100} />
      </RefreshControl>
      <ContainerWallet style={[{ top: TOP }, animateStyle]}>
        <PanGestureHandler activeOffsetY={[-10, 10]} onGestureEvent={gestureHandler}>
          <ContainerHandler>
            <ContainerTitle onPress={toggleTransactions}>
              <Text bold color='primary' size={16}>Carteira de cashback</Text>
              <Icon size={27} color='primary' icon={expanded ? 'chevron-down' : 'chevron-up'}/>
            </ContainerTitle>
          </ContainerHandler>
        </PanGestureHandler>
        <Wallet expanded={expanded} navigation={navigation} />
      </ContainerWallet> */}
    </Container>
  )
}