import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-community/async-storage"
import { Buffer } from "buffer"

const AuthContext = createContext([])

function AuthProvider({children}) {

    const [token, setToken] = useState("")
    const [loadingToken, setLoadingToken] = useState(true)

    const [profile, setProfile] = useState({})
    const [loadingProfile, setLoadingProfile] = useState(true)

    const [loadingSignIn, setLoadingSignIn] = useState(false)

    useEffect(() => {
        const loadStorageDate = async () => {
            const tokenStorage = await AsyncStorage.getItem("@token")
            const profileStorage = await AsyncStorage.getItem("@profile")

            if (tokenStorage) setToken(tokenStorage)
            if (profileStorage) setProfile(JSON.parse(Buffer.from(profileStorage, "base64").toString("utf-8")))

            setLoadingToken(false)
            setLoadingProfile(false)
        }

        loadStorageDate()
    }, [])

    const signIn = async (data) => {
        setLoadingSignIn(true)

        const rawProfile = {
            photo: "",
            name: "Gustavo Valsechi de Freitas",
            email: "gustavo@zone.com.br",
            cpf: "09204942932",
            phone: "48999100598",
        }

        const token = Buffer.from(JSON.stringify(data)).toString("base64")
        const profile = Buffer.from(JSON.stringify(rawProfile)).toString("base64")

        await AsyncStorage.setItem("@token", token)
        await AsyncStorage.setItem("@profile", profile)

        setToken(token)
        setProfile(rawProfile)

        setLoadingSignIn(false)
    }

    const signOut = async () => {
        await AsyncStorage.removeItem("@token")
        await AsyncStorage.removeItem("@profile")

        setToken("")
        setProfile({})
    }

    return (
        <AuthContext.Provider value={{
            token,
            loadingToken,
            signIn,
            signOut,
            loadingSignIn,
            profile,
            loadingProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext) 

export { AuthProvider, useAuth }
