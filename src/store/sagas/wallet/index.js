import { call, put } from 'redux-saga/effects'
import { Api } from "../../../core"
import Toast from "react-native-toast-message"
import buffer from 'buffer'

import WalletActions from '../../ducks/wallet'
import _ from 'lodash'

export function* amount() {
  try {
    yield put(WalletActions.setLoadingAmount(true))

    const { data } = yield call(Api.get, "cliente/wallet/amount")
    
    yield put(WalletActions.amountSuccess(data.amount))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum cashback encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar saldo', text2: message })
  } finally {
    yield put(WalletActions.setLoadingAmount(false))
  }
}

export function* wallet({ credentials }) {
  try {
    yield put(WalletActions.setLoadingWallet(true))

    const { data } = yield call(Api.get, "cliente/wallet-content", { params: credentials })
    
    yield put(WalletActions.walletSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum cashback encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar carteira', text2: message })
  } finally {
    yield put(WalletActions.setLoadingWallet(false))
    yield put(WalletActions.setFetchingMoreWallet(false))
    yield put(WalletActions.setReloadWallet(false))
  }
}

export function* walletGroup({ credentials }) {
  try {
    yield put(WalletActions.setLoadingWalletGroup(true))

    const { data } = yield call(Api.get, 'cliente/wallet/economic-group', { params: credentials })
    
    yield put(WalletActions.walletGroupSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum grupo encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar grupo', text2: message })
  } finally {
    yield put(WalletActions.setLoadingWalletGroup(false))
    yield put(WalletActions.setFetchingMoreWalletGroup(false))
    yield put(WalletActions.setReloadWalletGroup(false))
  }
}

export function* walletDetails({ credentials }) {
  try {
    yield put(WalletActions.setLoadingWalletDetails(true))

    const { data } = yield call(Api.get, 'cliente/wallet/details', { params: credentials })
    
    yield put(WalletActions.walletDetailsSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum grupo encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar grupo', text2: message })
  } finally {
    yield put(WalletActions.setLoadingWalletDetails(false))
    yield put(WalletActions.setFetchingMoreWalletDetails(false))
    yield put(WalletActions.setReloadWalletDetails(false))
  }
}

export function* walletTransferCustomer({ credentials }) {
  try {
    yield put(WalletActions.setLoadingWalletTransferCustomer(true))

    const bufferCredentials = buffer.Buffer.from(JSON.stringify(credentials)).toString('base64')

    const { data } = yield call(Api.get, `transferir/infos-amigos?credentials=${bufferCredentials}`)
    
    yield put(WalletActions.walletTransferCustomerSuccess(data || {}))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Não existe nenhum usuário com esse telefone'

    return Toast.show({ type: 'error', text1: 'Nenhum usuário encontrado!', text2: message })
  } finally {
    yield put(WalletActions.setLoadingWalletTransferCustomer(false))
  }
}

export function* walletTransfer({ body, navigation }) {
  try {
    yield put(WalletActions.setLoadingWalletTransfer(true))

    const bufferCredentials = buffer.Buffer.from(JSON.stringify({ password: body.password })).toString('base64')

    yield call(Api.post, `cashbacks/transferir?credentials=${bufferCredentials}`, _.omit(body, ["password"]))

    Toast.show({ 
      type: 'success', 
      text1: 'Sucesso!', 
      text2: 'Cashback transferido com sucesso' 
    })

    yield put(WalletActions.setWalletDetailsPage(0))
    yield put(WalletActions.walletDetailsRequest({
      limit: 20,
      offset: 0,
      company_id: body.id_company
    }))

    navigation.goBack()
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Ocorreu um erro ao transferir cashback'

    return Toast.show({ type: 'error', text1: 'Erro ao transferir cashback', text2: message })
  } finally {
    yield put(WalletActions.setLoadingWalletTransfer(false))
  }
}


