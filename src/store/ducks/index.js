import { combineReducers } from 'redux'

import { reducer as auth } from './auth'
import { reducer as wallet } from './wallet'
import { reducer as profile } from './profile'
import { reducer as coupon } from './coupon'
import { reducer as indicate } from './indicate'
import { reducer as establishment } from './establishment'
import { reducer as notification } from './notification'

export default combineReducers({
  auth,
  wallet,
  profile,
  coupon,
  indicate,
  establishment,
  notification,
})
