import { call, put, select } from 'redux-saga/effects'
import { Api } from "../../../core"
import Toast from "react-native-toast-message"

import NotificationActions from '../../ducks/notification'

export function* notifications({ credentials }) {
  try {
    const { data } = yield call(Api.get, 'customer/push', { params: credentials })
    
    yield put(NotificationActions.notificationsSuccess(data))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Nenhuma notificação encontrado'

    return Toast.show({ type: 'error', text1: 'Erro ao buscar notificações', text2: message })
  } finally {
    yield put(NotificationActions.setLoadingNotifications(false))
    yield put(NotificationActions.setFetchingMoreNotifications(false))
    yield put(NotificationActions.setReloadNotifications(false))
  }
}

export function* notificationRead({ body }) {
  try {
    if (!body) yield put(NotificationActions.setLoadingNotificationRead(true))

    yield call(Api.post, 'customer/push/read', body)

    const { notificationsPage } = yield select((state) => state.notification)

    yield put(NotificationActions.notificationsRequest({ offset: notificationsPage, limit: 20 }))
    yield put(NotificationActions.setFetchingMoreNotifications(true))
  } catch (error) {

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message
      || 'Ocorreu um erro ao marcar a notificação como lida'

    return Toast.show({ type: 'error', text1: 'Erro ao ler notificação', text2: message })
  } finally {
    yield put(NotificationActions.setLoadingNotificationRead(false))
  }
}

export function* updateNotificationDevice({ body }) {
  try {
    yield put(NotificationActions.setLoadingUpdateNotificationDevice(true))

    yield call(Api.post, 'customer/push/device', body)
  } catch (error) {
  } finally {
    yield put(NotificationActions.setLoadingUpdateNotificationDevice(false))
  }
}




