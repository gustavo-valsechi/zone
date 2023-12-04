import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { 
    Main, 
    PlateDetails, 
    Profile,
} from "../pages"

export function AppRoutes(props) {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Main" component={Main} />
            <Screen name="PlateDetails" component={PlateDetails} />
            <Screen name="Profile" component={Profile} />
        </Navigator>
    )
}
