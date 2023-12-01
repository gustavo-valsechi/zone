import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { Start, Login, Recovery, Register } from '../pages'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes(props) {
    return (
        <Navigator initialRouteName='Start' screenOptions={{ headerShown: false }}>
            <Screen name="Start" component={Start} />
            <Screen name="Login" component={Login} />
            <Screen name="Recovery" component={Recovery} />
            <Screen name="Register" component={Register} />
        </Navigator>
    )
}
