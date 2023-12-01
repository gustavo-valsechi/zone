import { call, put } from 'redux-saga/effects'
import { Api } from "../../../core"
import Toast from "react-native-toast-message"
import buffer from 'buffer'

import EstablishmentActions from '../../ducks/establishment'

export function* establishments({ credentials }) {
  try {
    const bufferCredentials = buffer.Buffer.from(JSON.stringify(credentials)).toString('base64')

    const { data } = yield call(Api.get, `cliente/establishments?credentials=${bufferCredentials}`)
    
    yield put(EstablishmentActions.establishmentsSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum estabelecimento encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar estabelecimentos', text2: message })
  } finally {
    yield put(EstablishmentActions.setLoadingLocation(false))
    yield put(EstablishmentActions.setFetchingMoreLocation(false))
    yield put(EstablishmentActions.setReloadLocation(false))
  }
}

export function* establishmentDetails({ uuid }) {
  try {
    yield put(EstablishmentActions.setLoadingEstablishmentDetails(true))

    const { data } = yield call(Api.get, `/cliente/establishments/${uuid}`)
    
    yield put(EstablishmentActions.establishmentDetailsSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum estabelecimento encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar estabelecimentos', text2: message })
  } finally {
    yield put(EstablishmentActions.setLoadingEstablishmentDetails(false))
  }
}

export function* ufCityLocation({ credentials }) {
  try {
    yield put(EstablishmentActions.setLoadingUfCityLocation(true))

    const { data } = yield call(Api.get, 'empresas/retrieve-uf-city-companies', { params: credentials })
    
    yield put(EstablishmentActions.ufCityLocationSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum estabelecimento encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar estabelecimentos', text2: message })
  } finally {
    yield put(EstablishmentActions.setLoadingUfCityLocation(false))
  }
}




