import React, {createContext, useContext, useEffect} from "react"
import AsyncStorage from "@react-native-community/async-storage"
import {useDispatch, useSelector} from "react-redux"
import AuthActions from '../store/ducks/auth'

const AuthContext = createContext([])

function AuthProvider({children}) {
    const dispatch = useDispatch()

    const {
        sessionToken: token,
        loadingSessionToken,
    } = useSelector(state => state.auth)

    const sessionStorageKey = '@nummuscustomer:token'

    async function signInWithPlatform(data) {
        dispatch(AuthActions.signInPlatformRequest(data))
    }

    async function signOut() {
        dispatch(AuthActions.signOutPlatformRequest())
    }

    async function recoverPassword(data) {
        dispatch(AuthActions.recoverPasswordRequest(data))
    }

    async function resetPassword(data, navigation) {
        dispatch(AuthActions.resetPasswordRequest(data, navigation))
    }

    useEffect(() => {
        const loadStorageDate = async () => {
            const tokenStorage = await AsyncStorage.getItem(sessionStorageKey)

            if (tokenStorage) {
                dispatch(AuthActions.initSystemRequest({ token: tokenStorage }))
                dispatch(AuthActions.setSessionToken(tokenStorage))
            } 

            dispatch(AuthActions.setLoadingSessionToken(false))
        }

        loadStorageDate()
    }, [])

    return (
        <AuthContext.Provider value={{
            token,
            loadingSessionToken,
            signInWithPlatform,
            signOut,
            recoverPassword,
            resetPassword,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext)
}

export { AuthProvider, useAuth }
