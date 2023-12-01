import { call, put, select } from 'redux-saga/effects'
import { Analytics, Api } from "../../../core"
import AsyncStorage from "@react-native-community/async-storage"
import Toast from "react-native-toast-message"
import _ from 'lodash'

import AuthActions from '../../ducks/auth'
import NotificationActions from '../../ducks/notification'
import WalletActions from '../../ducks/wallet'
import ProfileActions from '../../ducks/profile'

const sessionStorageKey = '@nummuscustomer:token'

export function* initSystem({ credentials }) {
    try {
        yield call(Analytics.event, 'app_iniciar_sessao', credentials)
    } catch (error) {

        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || error.message
            || 'Ocorreu um erro ao iniciar o sistema'

        return Toast.show({ type: 'error', text1: 'Erro ao iniciar sistema', text2: message })
    } finally {
        yield put(AuthActions.setLoadingInitSystem(false))
    }
}

export function* signIn({ body }) {
    try {
        yield put(AuthActions.toggleLoadingAuthentication(true))
  
        const { data: { session_token }} = yield call(Api.post, 'customer/session', body)
 
        yield put(AuthActions.setSessionToken(session_token))
        yield call([AsyncStorage, 'setItem'], sessionStorageKey, session_token)

        yield call(Analytics.event, 'app_entrar', { phone: body.phone })
    } catch (error) {

        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || 'Telefone ou senha inválida, tente novamente'

        return Toast.show({ type: 'error', text1: 'Falha ao efetuar o login!', text2: message })
    } finally {
        yield put(AuthActions.toggleLoadingAuthentication(false))
    }
}

export function* signOut() {
    try {
        yield put(AuthActions.setSessionToken(""))
        yield put(NotificationActions.setClearNotificationsContent())
        yield put(ProfileActions.setClearProfileContent())
        yield put(WalletActions.setClearWalletContent())
        yield call([AsyncStorage, 'clear'])
        yield call(Analytics.event, 'app_sair')
    } catch (error) {
        console.error(error)
    }
}

export function* recoverPassword({ body }) {
    try {
        yield put(AuthActions.setLoadingRecoverPassword(true))

        yield call(Api.post, 'recuperar-senha-cliente', body)

        Toast.show({
            type: 'success',
            text1: 'Token enviado para seu SMS',
            text2: 'Verifique seu SMS e preencha os campos abaixo'
        })

        yield call(Analytics.event, 'app_recuperar_senha', { phone: body.clientInfo })
    } catch (error) {

        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || error.message
            || 'Ocorreu um erro ao tentar recuperar a senha'

        return Toast.show({ type: 'error', text1: 'Erro ao recuperar senha', text2: message })
    } finally {
        yield put(AuthActions.setLoadingRecoverPassword(false))
        yield put(AuthActions.setRecoveryStep(2))
    }
}

export function* resetPassword({ body, navigation }) {
    try {
        yield put(AuthActions.setLoadingResetPassword(true))

        yield call(Api.put, 'recuperar-senha-cliente', body)

        Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'Sua senha foi alterada com sucesso'
        })
    } catch (error) {

        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || error.message
            || 'Ocorreu um erro ao tentar resetar a senha'

        return Toast.show({ type: 'error', text1: 'Erro ao resetar senha', text2: message })
    } finally {
        yield put(AuthActions.setLoadingResetPassword(false))
        yield put(AuthActions.setRecoveryStep(1))
        navigation.navigate('Login')
    }
}

export function* registrationToken({ body }) {
    try {
        yield put(AuthActions.setLoadingRegistrationToken(true))
        
        const { data } = yield call(Api.post, 'customer/register/validate-phone-document-number', body)
        
        yield put(AuthActions.setLoadingRegistrationToken(false))
        
        yield put(AuthActions.setRegistrationStep(2))
        
        Toast.show({
            type: 'success',
            text1: 'Token enviado para seu SMS',
            text2: 'Verifique seu SMS e preencha os campos abaixo'
        })
        
        yield put(AuthActions.setRegisterCustomer(data.customer || {}))
        
        yield put(AuthActions.setResendTokenTimer(60))

        yield call(Analytics.event, 'app_registrar_token', body)
    } catch (error) {
        yield put(AuthActions.setLoadingRegistrationToken(false))

        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || error.message
            || 'Já possui um cliente com este telefone ou CPF/CNPJ cadastrado!'

        return Toast.show({ type: 'error', text1: 'Telefone ou CPF/CNPJ já cadastrados!', text2: message })
    }
}
  
export function* registrationTokenVerification({ body }) {
    try {
        yield put(AuthActions.setLoadingRegistrationTokenVerification(true))
        
        const { registerCustomer } = yield select(state => state.auth)
        
        const { data } = yield call(Api.post, `customer/register/validate-token/${registerCustomer.id}`, body)
        
        yield put(AuthActions.setLoadingRegistrationTokenVerification(false))

        yield put(AuthActions.setRegisterCustomer(data.customer || {}))

        yield put(AuthActions.setRegistrationStep(3))

        yield call(Analytics.event, 'app_registrar_token_verificacao')
    } catch (error) {
        yield put(AuthActions.setLoadingRegistrationTokenVerification(false))
        
        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || error.message
            || 'Verifique e tente novamente'

        return Toast.show({ type: 'error', text1: 'Token inválido!', text2: message })
    }
}
  
export function* registrationInformations({ body }) {
    try {
        yield put(AuthActions.setLoadingRegistrationInformations(true))
        
        const { registerCustomer } = yield select(state => state.auth)

        const { data } = yield call(Api.post, `customer/register/complete-basic-information/${registerCustomer.id}`, body)

        yield put(AuthActions.setRegisterCustomer(data.customer || {}))
        
        yield put(AuthActions.setLoadingRegistrationInformations(false))

        yield put(AuthActions.setRegistrationStep(4))

        yield call(Analytics.event, 'app_registrar_informacoes', body)
    } catch (error) {
        yield put(AuthActions.setLoadingRegistrationInformations(false))

        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || error.message
            || 'Verifique e tente novamente'

        return Toast.show({ type: 'error', text1: 'Erro ao salvar informações', text2: message })    
    }
}
  
export function* registrationComplete({ body, navigation }) {
    try {
        yield put(AuthActions.setLoadingRegistrationComplete(true))

        const { registerCustomer } = yield select((state) => state.auth)

        const { data: { session_token }} = yield call(Api.post, `customer/register/complete-register/${registerCustomer.id}`, body)

        yield put(AuthActions.setSessionToken(session_token))
        yield call([AsyncStorage, 'setItem'], sessionStorageKey, session_token)

        yield put(AuthActions.setRegisterCustomer({}))
        yield put(AuthActions.setRegistrationStep(1))

        navigation.navigate('Main')

        yield call(Analytics.event, 'app_registrar_autenticacao')
    } catch (error) {

        const message = error.response?.data?.error?.message 
            || error.response?.data?.message 
            || error.message
            || 'Verifique e tente novamente'

        return Toast.show({ type: 'error', text1: 'Erro ao fazer cadastro da sua conta', text2: message })   
    } finally {
        yield put(AuthActions.setLoadingRegistrationComplete(false))
    }
}
