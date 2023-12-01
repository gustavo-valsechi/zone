import { call, put } from 'redux-saga/effects'
import { Api } from "../../../core"
import Toast from "react-native-toast-message"

import IndicateActions from '../../ducks/indicate'

export function* indicate({ body: { body, type }, navigation, clear }) {
  try {
    yield put(IndicateActions.setLoadingIndicate(true))

    yield call(Api.post, type === "friend" ? 'cliente/indica-amigo' : 'cutucadas', body)

    Toast.show({ 
      type: 'success', 
      text1: 'Sucesso!', 
      text2: `${type === "friend" ? 'Amigo' : 'Estabelecimento'} indicado com sucesso` 
    })

    if (clear) clear()
  } catch (error) {
    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || `Ocorreu um erro ao indicar o ${type === "friend" ? 'amigo' : 'estabelecimento'}`

    return Toast.show({ 
      type: 'error', 
      text1: `Erro ao indicar o ${type === "friend" ? 'amigo' : 'estabelecimento'}`, 
      text2: message 
    })
  } finally {
    yield put(IndicateActions.setLoadingIndicate(false))
  }
}




