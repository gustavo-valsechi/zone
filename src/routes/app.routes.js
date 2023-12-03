import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { 
    Main, 
    // Profile, 
    // ProfileUpdate,
    // ProfilePassword, 
    // Location, 
    // Notifications, 
} from "../pages"

export function AppRoutes(props) {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Main" component={Main} />
            {/* <Screen name="Profile" component={Profile} />
            <Screen name="ProfileUpdate" component={ProfileUpdate} />
            <Screen name="ProfilePassword" component={ProfilePassword} />
            <Screen name="Location" component={Location} /> */}
        </Navigator>
    )
}
