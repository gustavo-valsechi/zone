import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    initSystemRequest: ['credentials'],
    setLoadingInitSystem: ['bool'],

    signInPlatformRequest: ['body'],
    toggleLoadingAuthentication: ['bool'],

    setLoadingSessionToken: ['bool'],
    setSessionToken: ['token'],

    signOutPlatformRequest: [null],

    recoverPasswordRequest: ['body'],
    setLoadingRecoverPassword: ['bool'],
    resetPasswordRequest: ['body', 'navigation'],
    setLoadingResetPassword: ['bool'],
    setRecoveryStep: ['value'],

    registrationTokenRequest: ["body"],
    setLoadingRegistrationToken: ["bool"],
    registrationTokenVerificationRequest: ["body"],
    setLoadingRegistrationTokenVerification: ["bool"],
    registrationInformationsRequest: ["body"],
    setLoadingRegistrationInformations: ["bool"],
    registrationCompleteRequest: ["body", "navigation"],
    setLoadingRegistrationComplete: ["bool"],
    setRegistrationStep: ["value"],
    setRegisterCustomer: ["value"],
    setResendTokenTimer: ["value"],
})

export const AuthTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    loadingInitSystem: false,

    loadingAuthentication: false,

    loadingSessionToken: true,
    sessionToken: "",

    loadingRecoverPassword: false,
    loadingResetPassword: false,
    recoveryStep: 1,

    loadingRegistrationToken: false,
    loadingRegistrationTokenVerification: false,
    loadingRegistrationInformations: false,
    loadingRegistrationComplete: false,
    registrationStep: 1,
    registerCustomer: {},
    resendTokenTimer: 60,
})

const setLoadingInitSystem = (state, { bool }) => state.merge({ loadingInitSystem: bool })

const toggleLoadingAuthentication = (state, { bool }) => state.merge({ loadingAuthentication: bool })

const setLoadingSessionToken = (state, { bool }) => state.merge({ loadingSessionToken: bool })
const setSessionToken = (state, { token }) => state.merge({ sessionToken: token });

const setLoadingRecoverPassword = (state, { bool }) => state.merge({ loadingRecoverPassword: bool })
const setLoadingResetPassword = (state, { bool }) => state.merge({ loadingResetPassword: bool })
const setRecoveryStep = (state, { value }) => state.merge({ recoveryStep: value })

const setLoadingRegistrationToken = (state, { bool }) => state.merge({ loadingRegistrationToken: bool });
const setLoadingRegistrationTokenVerification = (state, { bool }) => state.merge({ loadingRegistrationTokenVerification: bool })
const setLoadingRegistrationInformations = (state, { bool }) => state.merge({ loadingRegistrationInformations: bool })
const setLoadingRegistrationComplete = (state, { bool }) => state.merge({ loadingRegistrationComplete: bool })
const setRegistrationStep = (state, { value }) => state.merge({ registrationStep: value })
const setRegisterCustomer = (state, { value }) => state.merge({ registerCustomer: value })
const setResendTokenTimer = (state, { value }) => state.merge({ resendTokenTimer: value })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOADING_INIT_SYSTEM]: setLoadingInitSystem,

    [Types.TOGGLE_LOADING_AUTHENTICATION]: toggleLoadingAuthentication,

    [Types.SET_LOADING_SESSION_TOKEN]: setLoadingSessionToken,
    [Types.SET_SESSION_TOKEN]: setSessionToken,

    [Types.SET_LOADING_RECOVER_PASSWORD]: setLoadingRecoverPassword,
    [Types.SET_LOADING_RESET_PASSWORD]: setLoadingResetPassword,
    [Types.SET_RECOVERY_STEP]: setRecoveryStep,

    [Types.SET_LOADING_REGISTRATION_TOKEN]: setLoadingRegistrationToken,
    [Types.SET_LOADING_REGISTRATION_TOKEN_VERIFICATION]: setLoadingRegistrationTokenVerification,
    [Types.SET_LOADING_REGISTRATION_INFORMATIONS]: setLoadingRegistrationInformations,
    [Types.SET_LOADING_REGISTRATION_COMPLETE]: setLoadingRegistrationComplete,
    [Types.SET_REGISTRATION_STEP]: setRegistrationStep,
    [Types.SET_REGISTER_CUSTOMER]: setRegisterCustomer,
    [Types.SET_RESEND_TOKEN_TIMER]: setResendTokenTimer,
})
