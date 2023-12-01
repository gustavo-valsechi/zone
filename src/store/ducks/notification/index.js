import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  notificationsRequest: ['credentials'],
  notificationsSuccess: ['data'],
  setNotificationsPage: ['value'],
  setLoadingNotifications: ['bool'],
  setFetchingMoreNotifications: ['bool'],
  setReloadNotifications: ['bool'],

  notificationReadRequest: ['body'],
  setLoadingNotificationRead: ['bool'],

  updateNotificationDeviceRequest: ['body'],
  setLoadingUpdateNotificationDevice: ['bool'],

  setClearNotificationsContent: null,
})

export const NotificationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  notifications: { content: [], total: 0, totalPage: 0, unread: 0 },
  notificationsPage: 0,
  loadingNotifications: true,
  fetchingMoreNotifications: false,
  reloadNotifications: false,

  loadingNotificationRead: false,

  loadingUpdateNotificationDevice: false,
})

const notificationsSuccess = (state, { data }) =>
  !state.notificationsPage
  ? state.merge({ notifications: data })
  : state.merge({ notifications: {
      unread: data.unread,
      total: data.total,
      totalPage: data.totalPage,
      content: state.notifications.content.concat(data.content)
    }})
const setNotificationsPage = (state, { value }) => state.merge({ notificationsPage: value })
const setLoadingNotifications = (state, { bool }) => state.merge({ loadingNotifications: bool })
const setFetchingMoreNotifications = (state, { bool }) => state.merge({ fetchingMoreNotifications: bool })
const setReloadNotifications = (state, { bool }) => state.merge({ reloadNotifications: bool })

const setLoadingNotificationRead = (state, { bool }) => state.merge({ loadingNotificationRead: bool })

const setLoadingUpdateNotificationDevice = (state, { bool }) => state.merge({ loadingUpdateNotificationDevice: bool })

const setClearNotificationsContent = (state) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATIONS_SUCCESS]: notificationsSuccess,
  [Types.SET_NOTIFICATIONS_PAGE]: setNotificationsPage,
  [Types.SET_LOADING_NOTIFICATIONS]: setLoadingNotifications,
  [Types.SET_FETCHING_MORE_NOTIFICATIONS]: setFetchingMoreNotifications,
  [Types.SET_RELOAD_NOTIFICATIONS]: setReloadNotifications,

  [Types.SET_LOADING_NOTIFICATION_READ]: setLoadingNotificationRead,

  [Types.SET_LOADING_UPDATE_NOTIFICATION_DEVICE]: setLoadingUpdateNotificationDevice,

  [Types.SET_CLEAR_NOTIFICATIONS_CONTENT]: setClearNotificationsContent,
})
