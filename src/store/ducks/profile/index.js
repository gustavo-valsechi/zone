import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  profileRequest: null,
  profileSuccess: ['data'],
  setLoadingProfile: ['bool'],

  updateProfileRequest: ['body', 'navigation'],
  setLoadingUpdateProfile: ['bool'],

  changePasswordRequest: ['body', 'navigation'],
  setLoadingChangePassword: ['bool'],

  ProfilePasswordTokenRequest: ['body'],
  setLoadingProfilePasswordToken: ['bool'],
  ProfilePasswordRequest: ['body', 'navigation'],
  setLoadingProfilePassword: ['bool'],
  setProfilePasswordStep: ['value'],

  setClearProfileContent: null,
})

export const ProfileTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  profile: {},
  loadingProfile: true,

  loadingUpdateProfile: false,

  loadingChangePassword: false,

  loadingProfilePasswordToken: false,
  loadingProfilePassword: false,
  ProfilePasswordStep: 1,
})

const profileSuccess = (state, { data }) => state.merge({ profile: data })
const setLoadingProfile = (state, { bool }) => state.merge({ loadingProfile: bool })

const setLoadingUpdateProfile = (state, { bool }) => state.merge({ loadingUpdateProfile: bool })

const setLoadingChangePassword = (state, { bool }) => state.merge({ loadingChangePassword: bool })

const setLoadingProfilePasswordToken = (state, { bool }) => state.merge({ loadingProfilePasswordToken: bool })
const setLoadingProfilePassword = (state, { bool }) => state.merge({ loadingProfilePassword: bool })
const setProfilePasswordStep = (state, { value }) => state.merge({ ProfilePasswordStep: value })

const setClearProfileContent = (state) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_SUCCESS]: profileSuccess,
  [Types.SET_LOADING_PROFILE]: setLoadingProfile,

  [Types.SET_LOADING_UPDATE_PROFILE]: setLoadingUpdateProfile,

  [Types.SET_LOADING_CHANGE_PASSWORD]: setLoadingChangePassword,

  [Types.SET_LOADING_CHANGE_PHONE_TOKEN]: setLoadingProfilePasswordToken,
  [Types.SET_LOADING_CHANGE_PHONE]: setLoadingProfilePassword,
  [Types.SET_CHANGE_PHONE_STEP]: setProfilePasswordStep,

  [Types.SET_CLEAR_PROFILE_CONTENT]: setClearProfileContent,
})
