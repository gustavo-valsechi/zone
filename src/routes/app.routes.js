import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { useDispatch } from "react-redux"
import { Analytics } from '../core'
import OneSignal from "react-native-onesignal"

import NotificationActions from "../store/ducks/notification"

const { Navigator, Screen } = createStackNavigator()

import { 
    Main, 
    Profile, 
    ProfileUpdate, 
    ChangePassword, 
    ProfilePassword, 
    Coupons, 
    WebView, 
    Indicate, 
    Location, 
    Notifications, 
    EstablishmentDetails,
    WalletGroup,
    WalletDetails,
    WalletTransfer
} from "../pages"

export function AppRoutes(props) {
    const dispatch = useDispatch()

    OneSignal.setAppId("d91a7906-f00e-4703-8191-cd683e58e336")

    OneSignal.getDeviceState().then(async (device) => {
        if (!device.pushToken || !device.userId) return

        const body = { 
            deviceId: device.userId,
            pushToken: device.pushToken,
        }

        await Analytics.event('push_dispositivo', body)

        dispatch(NotificationActions.updateNotificationDeviceRequest(body))
    })

    OneSignal.setNotificationWillShowInForegroundHandler(async (push) => {
        let notification = push.getNotification()

        dispatch(NotificationActions.notificationsRequest({ offset: 0, limit: 20 }))
        dispatch(NotificationActions.setNotificationsPage(0))

        await Analytics.event('push_receptor', notification)

        push.complete(notification)
    })

    OneSignal.setNotificationOpenedHandler(async ({ notification }) => {
        const { location, company } = notification?.additionalData || {}

        await Analytics.event('push_abertura', notification)

        props.navigation.navigate(location || "Notifications", { uuid: company?.id })
    })

    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Main" component={Main} />
            <Screen name="Profile" component={Profile} />
            <Screen name="ProfileUpdate" component={ProfileUpdate} />
            <Screen name="ProfilePassword" component={ProfilePassword} />
            <Screen name="Location" component={Location} />
        </Navigator>
    )
}
