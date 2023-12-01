import { call, put } from 'redux-saga/effects'
import { Api } from "../../../core"
import { Platform } from 'react-native'
import Toast from "react-native-toast-message"
import _ from 'lodash'

import ProfileActions from '../../ducks/profile'

export function* profile() {
  try {
    yield put(ProfileActions.setLoadingProfile(true))

    const { data } = yield call(Api.get, "cliente")
    
    yield put(ProfileActions.profileSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum perfil encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar perfil', text2: message })
  } finally {
    yield put(ProfileActions.setLoadingProfile(false))
  }
}

export function* updateProfile({ body, navigation }) {
  try {
    yield put(ProfileActions.setLoadingUpdateProfile(true))

    if (body.photo) {
      const file = new FormData()

      const extension = _.split(body.photo.uri, ".")

      file.append('file', {
        uri: Platform.OS === "android" ? body.photo.uri : _.replace(body.photo.uri, "file://", ""),
        name: body.photo.name ? body.photo.name : 'image.jpg',
        type: `image/${extension[extension.length - 1]}`
      })
      
      yield call(Api.post, 'cliente/upload-foto-perfil', file, { headers: { "Content-type": "multipart/form-data" }})
    }

    yield call(Api.put, "cliente/alterar-perfil", _.omit(body, ["photo"]))

    yield put(ProfileActions.profileRequest())

    navigation.navigate('Profile')

    Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Perfil alterado com sucesso' })
  } catch (error) {
    
    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Ocorreu um erro ao atualizar perfil, tente novamente'

    return Toast.show({ type: 'error', text1: 'Erro ao atualizar perfil', text2: message })
  } finally {
    yield put(ProfileActions.setLoadingUpdateProfile(false))
  }
}

export function* changePassword({ body, navigation }) {
  try {
    yield put(ProfileActions.setLoadingChangePassword(true))

    yield call(Api.put, "cliente/alterar-senha", body)

    navigation.navigate('Profile')

    Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Senha alterada com sucesso' })
  } catch (error) {
    
    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Ocorreu um erro ao atualizar perfil, tente novamente'

    return Toast.show({ type: 'error', text1: 'Erro ao atualizar perfil', text2: message })
  } finally {
    yield put(ProfileActions.setLoadingChangePassword(false))
  }
}

export function* ProfilePasswordToken({ body }) {
  try {
    yield put(ProfileActions.setLoadingProfilePasswordToken(true))

    yield call(Api.post, "cliente/email-phone-exchange", body)

    yield put(ProfileActions.setProfilePasswordStep(2))

    Toast.show({
      type: 'success',
      text1: 'Token enviado para seu SMS',
      text2: 'Verifique seu SMS e preencha os campos abaixo'
    })
  } catch (error) {
    
    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Ocorreu um erro ao alterar o telefone, tente novamente'

    return Toast.show({ type: 'error', text1: 'Erro ao alterar o telefone', text2: message })
  } finally {
    yield put(ProfileActions.setLoadingProfilePasswordToken(false))
  }
}

export function* ProfilePassword({ body, navigation }) {
  try {
    yield put(ProfileActions.setLoadingProfilePassword(true))

    yield call(Api.post, "cliente/email-phone-exchange-token-verification", body)

    navigation.navigate('ProfileUpdate')
    yield put(ProfileActions.setProfilePasswordStep(1))

    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: 'Telefone alterado com sucesso'
    })
  } catch (error) {
    
    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Ocorreu um erro ao alterar o telefone, tente novamente'

    return Toast.show({ type: 'error', text1: 'Erro ao alterar o telefone', text2: message })
  } finally {
    yield put(ProfileActions.setLoadingProfilePassword(false))
  }
}



