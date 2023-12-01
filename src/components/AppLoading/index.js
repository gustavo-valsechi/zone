import React from 'react'
import { ContainerLoading } from "./style"
import { Logo } from "../../pages/auth/login/styles"
import { ActivityIndicator } from "react-native"
import { StatusBar } from 'expo-status-bar'

export function AppLoading() {
    return (
        <ContainerLoading>
            <StatusBar translucent />
            <Logo source={require('../../assets/logo.png')} />
            <ActivityIndicator size="large" style={{ position: 'absolute', bottom: 150 }} />
        </ContainerLoading>
    )
}
