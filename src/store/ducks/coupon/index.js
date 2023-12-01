import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  couponsRequest: ['credentials'],
  couponsSuccess: ['data'],
  setCouponsPage: ['value'],
  setLoadingCoupons: ['bool'],
  setFetchingMoreCoupons: ['bool'],
  setReloadCoupons: ['bool'],

  activeCouponRequest: ['uuid', 'active'],
  setLoadingActiveCoupon: ['bool'],

  setClearCouponsContent: null,
})

export const CouponTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  coupons: { content: [], total: 0, totalPage: 0 },
  couponsPage: 0,
  loadingCoupons: true,
  fetchingMoreCoupons: false,
  reloadCoupons: false,

  loadingActiveCoupon: false,
})

const couponsSuccess = (state, { data }) =>
  !state.couponsPage
  ? state.merge({ coupons: data })
  : state.merge({ coupons: {
      total: data.total,
      totalPage: data.totalPage,
      content: state.coupons.content.concat(data.content)
    }})
const setCouponsPage = (state, { value }) => state.merge({ couponsPage: value })
const setLoadingCoupons = (state, { bool }) => state.merge({ loadingCoupons: bool })
const setFetchingMoreCoupons = (state, { bool }) => state.merge({ fetchingMoreCoupons: bool })
const setReloadCoupons = (state, { bool }) => state.merge({ reloadCoupons: bool })

const setLoadingActiveCoupon = (state, { bool }) => state.merge({ loadingActiveCoupon: bool })

const setClearCouponsContent = (state) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COUPONS_SUCCESS]: couponsSuccess,
  [Types.SET_COUPONS_PAGE]: setCouponsPage,
  [Types.SET_LOADING_COUPONS]: setLoadingCoupons,
  [Types.SET_FETCHING_MORE_COUPONS]: setFetchingMoreCoupons,
  [Types.SET_RELOAD_COUPONS]: setReloadCoupons,

  [Types.SET_LOADING_ACTIVE_COUPON]: setLoadingActiveCoupon,

  [Types.SET_CLEAR_COUPONS_CONTENT]: setClearCouponsContent,
})
