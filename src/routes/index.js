import React, { useRef } from "react"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import { useAuth } from "../contexts/auth"
import { AppLoading } from "../components/AppLoading"
import { useNetInfo } from "@react-native-community/netinfo"
import { Colors } from "../styles"
import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes"
import { BlockSystem } from "../components"

export function Routes() {
    const netInfo = useNetInfo()
    const routeNameRef = useRef()
    const navigationRef = useNavigationContainerRef()

    const { token, loadingToken } = useAuth()

    if (netInfo.isConnected === false) {
        return (
            <BlockSystem 
                icon={{ name: "wifi-off", pack: "feather" }}
                title="Perda de conexão com a internet"
                message="Seu dispositivo está sem internet, aguardando a conexão..."
            />
        )
    }

    return (
        <NavigationContainer 
            ref={navigationRef}
            theme={{ colors: { background: Colors["primary"] } }}
            onReady={() => routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name}
            onStateChange={async () => routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name}
        >
            {loadingToken
            ? <AppLoading/>
            : token
            ? <AppRoutes navigation={navigationRef} />
            : <AuthRoutes />}
        </NavigationContainer>
    )
}
