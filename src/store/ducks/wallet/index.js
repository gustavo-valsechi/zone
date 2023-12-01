import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  amountRequest: null,
  amountSuccess: ['data'],
  setLoadingAmount: ['bool'],

  walletRequest: ['credentials'],
  walletSuccess: ['data'],
  setWalletPage: ['value'],
  setLoadingWallet: ['bool'],
  setFetchingMoreWallet: ['bool'],
  setReloadWallet: ['bool'],

  walletGroupRequest: ['credentials'],
  walletGroupSuccess: ['data'],
  setWalletGroupPage: ['value'],
  setLoadingWalletGroup: ['bool'],
  setFetchingMoreWalletGroup: ['bool'],
  setReloadWalletGroup: ['bool'],

  walletDetailsRequest: ['credentials'],
  walletDetailsSuccess: ['data'],
  setWalletDetailsPage: ['value'],
  setLoadingWalletDetails: ['bool'],
  setFetchingMoreWalletDetails: ['bool'],
  setReloadWalletDetails: ['bool'],

  walletTransferCustomerRequest: ['credentials'],
  walletTransferCustomerSuccess: ['data'],
  setLoadingWalletTransferCustomer: ['bool'],
  walletTransferRequest: ['body', 'navigation'],
  setLoadingWalletTransfer: ['bool'],

  setModalFiltersWallet: ['bool'],
  setFiltersWallet: ['data'],
  setNameWallet: ['value'],
  setClearWalletFilters: null,

  setClearWalletContent: null,
  setClearWalletGroupContent: null,
  setClearWalletDetailsContent: null,
})

export const WalletTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  amount: "0.00",
  loadingAmount: true,

  wallet: { content: [], total: 0, totalPage: 0 },
  walletPage: 0,
  loadingWallet: true,
  fetchingMoreWallet: false,
  reloadWallet: false,

  walletGroup: { content: [], total: 0, totalPage: 0 },
  walletGroupPage: 0,
  loadingWalletGroup: true,
  fetchingMoreWalletGroup: false,
  reloadWalletGroup: false,

  walletDetails: { transactions: [], total: 0, totalPage: 0, company: {} },
  walletDetailsPage: 0,
  loadingWalletDetails: true,
  fetchingMoreWalletDetails: false,
  reloadWalletDetails: false,

  walletTransferCustomer: {},
  loadingWalletTransferCustomer: false,
  loadingWalletTransfer: false,

  modalFiltersWallet: false,
  filtersWallet: {},
  nameWallet: "",
})

const amountSuccess = (state, { data }) => state.merge({ amount: data })
const setLoadingAmount = (state, { bool }) => state.merge({ loadingAmount: bool })

const walletSuccess = (state, { data }) =>
  !state.walletPage
  ? state.merge({ wallet: data })
  : state.merge({ wallet: {
      total: data.total,
      totalPage: data.totalPage,
      content: state.wallet.content.concat(data.content)
    }})
const setWalletPage = (state, { value }) => state.merge({ walletPage: value })
const setLoadingWallet = (state, { bool }) => state.merge({ loadingWallet: bool })
const setFetchingMoreWallet = (state, { bool }) => state.merge({ fetchingMoreWallet: bool })
const setReloadWallet = (state, { bool }) => state.merge({ reloadWallet: bool })

const walletGroupSuccess = (state, { data }) =>
  !state.walletGroupPage
  ? state.merge({ walletGroup: data })
  : state.merge({ walletGroup: {
      total: data.total,
      totalPage: data.totalPage,
      content: state.walletGroup.content.concat(data.content)
    }})
const setWalletGroupPage = (state, { value }) => state.merge({ walletGroupPage: value })
const setLoadingWalletGroup = (state, { bool }) => state.merge({ loadingWalletGroup: bool })
const setFetchingMoreWalletGroup = (state, { bool }) => state.merge({ fetchingMoreWalletGroup: bool })
const setReloadWalletGroup = (state, { bool }) => state.merge({ reloadWalletGroup: bool })

const walletDetailsSuccess = (state, { data }) =>
  !state.walletDetailsPage
  ? state.merge({ walletDetails: data })
  : state.merge({ walletDetails: {
      total: data.total,
      totalPage: data.totalPage,
      company: data.company,
      transactions: state.walletDetails.transactions.concat(data.transactions)
    }})
const setWalletDetailsPage = (state, { value }) => state.merge({ walletDetailsPage: value })
const setLoadingWalletDetails = (state, { bool }) => state.merge({ loadingWalletDetails: bool })
const setFetchingMoreWalletDetails = (state, { bool }) => state.merge({ fetchingMoreWalletDetails: bool })
const setReloadWalletDetails = (state, { bool }) => state.merge({ reloadWalletDetails: bool })

const walletTransferCustomerSuccess = (state, { data }) => state.merge({ walletTransferCustomer: data })
const setLoadingWalletTransferCustomer = (state, { bool }) => state.merge({ loadingWalletTransferCustomer: bool })
const setLoadingWalletTransfer = (state, { bool }) => state.merge({ loadingWalletTransfer: bool })

const setModalFiltersWallet = (state, { bool }) => state.merge({ modalFiltersWallet: bool })
const setFiltersWallet = (state, { data }) => state.merge({ filtersWallet: data })
const setNameWallet = (state, { value }) => state.merge({ nameWallet: value })
const setClearWalletFilters = (state) => state.merge({
  filtersWallet: {},
  nameWallet: "",
})

const setClearWalletContent = (state) => state.merge(INITIAL_STATE)
const setClearWalletGroupContent = (state) => state.merge({
  walletGroup: { content: [], total: 0, totalPage: 0 },
  walletGroupPage: 0,
  loadingWalletGroup: true,
  fetchingMoreWalletGroup: false,
  reloadWalletGroup: false,
})
const setClearWalletDetailsContent = (state) => state.merge({
  walletDetails: { transactions: [], total: 0, totalPage: 0, company: {} },
  walletDetailsPage: 0,
  loadingWalletDetails: true,
  fetchingMoreWalletDetails: false,
  reloadWalletDetails: false,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AMOUNT_SUCCESS]: amountSuccess,
  [Types.SET_LOADING_AMOUNT]: setLoadingAmount,

  [Types.WALLET_SUCCESS]: walletSuccess,
  [Types.SET_WALLET_PAGE]: setWalletPage,
  [Types.SET_LOADING_WALLET]: setLoadingWallet,
  [Types.SET_FETCHING_MORE_WALLET]: setFetchingMoreWallet,
  [Types.SET_RELOAD_WALLET]: setReloadWallet,

  [Types.WALLET_GROUP_SUCCESS]: walletGroupSuccess,
  [Types.SET_WALLET_GROUP_PAGE]: setWalletGroupPage,
  [Types.SET_LOADING_WALLET_GROUP]: setLoadingWalletGroup,
  [Types.SET_FETCHING_MORE_WALLET_GROUP]: setFetchingMoreWalletGroup,
  [Types.SET_RELOAD_WALLET_GROUP]: setReloadWalletGroup,

  [Types.WALLET_DETAILS_SUCCESS]: walletDetailsSuccess,
  [Types.SET_WALLET_DETAILS_PAGE]: setWalletDetailsPage,
  [Types.SET_LOADING_WALLET_DETAILS]: setLoadingWalletDetails,
  [Types.SET_FETCHING_MORE_WALLET_DETAILS]: setFetchingMoreWalletDetails,
  [Types.SET_RELOAD_WALLET_DETAILS]: setReloadWalletDetails,

  [Types.WALLET_TRANSFER_CUSTOMER_SUCCESS]: walletTransferCustomerSuccess,
  [Types.SET_LOADING_WALLET_TRANSFER_CUSTOMER]: setLoadingWalletTransferCustomer,
  [Types.SET_LOADING_WALLET_TRANSFER]: setLoadingWalletTransfer,

  [Types.SET_MODAL_FILTERS_WALLET]: setModalFiltersWallet,
  [Types.SET_FILTERS_WALLET]: setFiltersWallet,
  [Types.SET_NAME_WALLET]: setNameWallet,
  [Types.SET_CLEAR_WALLET_FILTERS]: setClearWalletFilters,

  [Types.SET_CLEAR_WALLET_CONTENT]: setClearWalletContent,
  [Types.SET_CLEAR_WALLET_GROUP_CONTENT]: setClearWalletGroupContent,
  [Types.SET_CLEAR_WALLET_DETAILS_CONTENT]: setClearWalletDetailsContent,
})
