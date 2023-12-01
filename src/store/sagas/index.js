import { all, takeLatest } from 'redux-saga/effects'

import { AuthTypes} from '../ducks/auth'
import { signIn, signOut, recoverPassword, resetPassword, initSystem, registrationToken, registrationTokenVerification, registrationInformations, registrationComplete } from './auth'

import { WalletTypes } from '../ducks/wallet'
import { amount, wallet, walletDetails, walletGroup, walletTransfer, walletTransferCustomer } from './wallet'

import { ProfileTypes } from '../ducks/profile'
import { profile, updateProfile, changePassword, ProfilePasswordToken, ProfilePassword } from './profile'

import { CouponTypes } from '../ducks/coupon'
import { activeCoupon, coupons } from './coupon'

import { IndicateTypes } from '../ducks/indicate'
import { indicate } from './indicate'

import { EstablishmentTypes } from '../ducks/establishment'
import { establishmentDetails, establishments, ufCityLocation } from './establishment'

import { NotificationTypes } from '../ducks/notification'
import { notifications, notificationRead, updateNotificationDevice } from './notification'

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.INIT_SYSTEM_REQUEST, initSystem),
        takeLatest(AuthTypes.SIGN_IN_PLATFORM_REQUEST, signIn),
        takeLatest(AuthTypes.SIGN_OUT_PLATFORM_REQUEST, signOut),
        takeLatest(AuthTypes.RECOVER_PASSWORD_REQUEST, recoverPassword),
        takeLatest(AuthTypes.RESET_PASSWORD_REQUEST, resetPassword),
        takeLatest(AuthTypes.REGISTRATION_TOKEN_REQUEST, registrationToken),
        takeLatest(AuthTypes.REGISTRATION_TOKEN_VERIFICATION_REQUEST, registrationTokenVerification),
        takeLatest(AuthTypes.REGISTRATION_INFORMATIONS_REQUEST, registrationInformations),
        takeLatest(AuthTypes.REGISTRATION_COMPLETE_REQUEST, registrationComplete),

        takeLatest(WalletTypes.AMOUNT_REQUEST, amount),
        takeLatest(WalletTypes.WALLET_REQUEST, wallet),
        takeLatest(WalletTypes.WALLET_GROUP_REQUEST, walletGroup),
        takeLatest(WalletTypes.WALLET_DETAILS_REQUEST, walletDetails),
        takeLatest(WalletTypes.WALLET_TRANSFER_REQUEST, walletTransfer),
        takeLatest(WalletTypes.WALLET_TRANSFER_CUSTOMER_REQUEST, walletTransferCustomer),

        takeLatest(ProfileTypes.PROFILE_REQUEST, profile),
        takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfile),
        takeLatest(ProfileTypes.CHANGE_PASSWORD_REQUEST, changePassword),
        takeLatest(ProfileTypes.CHANGE_PHONE_TOKEN_REQUEST, ProfilePasswordToken),
        takeLatest(ProfileTypes.CHANGE_PHONE_REQUEST, ProfilePassword),

        takeLatest(CouponTypes.COUPONS_REQUEST, coupons),
        takeLatest(CouponTypes.ACTIVE_COUPON_REQUEST, activeCoupon),

        takeLatest(IndicateTypes.INDICATE_REQUEST, indicate),

        takeLatest(EstablishmentTypes.ESTABLISHMENTS_REQUEST, establishments),
        takeLatest(EstablishmentTypes.ESTABLISHMENT_DETAILS_REQUEST, establishmentDetails),
        takeLatest(EstablishmentTypes.UF_CITY_ESTABLISHMENTS_REQUEST, ufCityLocation),

        takeLatest(NotificationTypes.NOTIFICATIONS_REQUEST, notifications),
        takeLatest(NotificationTypes.NOTIFICATION_READ_REQUEST, notificationRead),
        takeLatest(NotificationTypes.UPDATE_NOTIFICATION_DEVICE_REQUEST, updateNotificationDevice),
    ])
}
