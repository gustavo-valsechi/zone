import { call, put, select } from 'redux-saga/effects'
import { Api } from "../../../core"
import Toast from "react-native-toast-message"
import buffer from 'buffer'

import CouponActions from '../../ducks/coupon'

export function* coupons({ credentials }) {
  try {
    const bufferCredentials = buffer.Buffer.from(JSON.stringify(credentials)).toString('base64')

    const { data } = yield call(Api.get, `cliente/coupon?credentials=${bufferCredentials}`)
    
    yield put(CouponActions.couponsSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhum cupom encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar cupons', text2: message })
  } finally {
    yield put(CouponActions.setLoadingCoupons(false))
    yield put(CouponActions.setFetchingMoreCoupons(false))
    yield put(CouponActions.setReloadCoupons(false))
  }
}

export function* activeCoupon({ uuid, active }) {
  try {
    yield put(CouponActions.setLoadingActiveCoupon(true))

    const bufferCredentials = buffer.Buffer.from(JSON.stringify({ couponId: uuid })).toString('base64')

    yield call(Api[active ? 'put' : 'post'], `cliente/coupon/${active ? 'disable' : 'active'}?credentials=${bufferCredentials}`)

    const { couponsPage } = yield select((state) => state.coupon)

    yield put(CouponActions.couponsRequest({ offset: couponsPage * 20, limit: 20 }))

    Toast.show({ 
      type: 'success', 
      text1: 'Sucesso!', 
      text2: `Cupom ${active ? 'desativado' : 'ativado'} com sucesso` 
    })
  } catch (error) {
    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || `Ocorreu um erro ao ${active ? 'desativar' : 'ativar'} o cupom`

    return Toast.show({ type: 'error', text1: `Erro ao ${active ? 'desativar' : 'ativar'} cupom`, text2: message })
  } finally {
    yield put(CouponActions.setLoadingActiveCoupon(false))
  }
}




