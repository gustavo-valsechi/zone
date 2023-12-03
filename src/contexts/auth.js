import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-community/async-storage"
import {useDispatch, useSelector} from "react-redux"
import AuthActions from '../store/ducks/auth'

const AuthContext = createContext([])

function AuthProvider({children}) {

    const [token, setToken] = useState("")
    const [loadingToken, setLoadingToken] = useState(true)
    const [loadingSignIn, setLoadingSignIn] = useState(false)

    async function signIn(data) {
        setLoadingSignIn(true)

        // dispatch(AuthActions.signInPlatformRequest(data))

        setLoadingSignIn(false)
    }

    async function signOut() {
        await AsyncStorage.removeItem('@token')
    }

    useEffect(() => {
        const loadStorageDate = async () => {
            const tokenStorage = await AsyncStorage.getItem('@token')

            if (tokenStorage) {
                // dispatch(AuthActions.initSystemRequest({ token: tokenStorage }))
                setToken(tokenStorage)
            } 

            setLoadingToken(false)
        }

        loadStorageDate()
    }, [])

    return (
        <AuthContext.Provider value={{
            token,
            loadingToken,
            signIn,
            signOut,
            loadingSignIn,
            profile: { name: "Gustavo Valsechi de Freitas" },
            loadingProfile: false
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext)
}

export { AuthProvider, useAuth }
