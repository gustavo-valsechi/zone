import React from "react"
import { ContainerLoading } from "./style"
import { ActivityIndicator } from "react-native"
import { StatusBar } from "expo-status-bar"
import Text from "../Text"

export function AppLoading() {
    return (
        <ContainerLoading>
            <StatusBar translucent />
            <Text bold size={30} color="primary">Zone</Text>
            <ActivityIndicator size="large" style={{ position: "absolute", bottom: 150 }} />
        </ContainerLoading>
    )
}
