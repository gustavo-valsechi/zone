import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  establishmentsRequest: ['credentials'],
  establishmentsSuccess: ['data'],
  setLocationPage: ['value'],
  setLoadingLocation: ['bool'],
  setFetchingMoreLocation: ['bool'],
  setReloadLocation: ['bool'],

  establishmentDetailsRequest: ['uuid'],
  establishmentDetailsSuccess: ['data'],
  setLoadingEstablishmentDetails: ['bool'],

  ufCityLocationRequest: ['credentials'],
  ufCityLocationSuccess: ['data'],
  setLoadingUfCityLocation: ['bool'],

  setModalFiltersEstablishment: ['bool'],
  setFiltersEstablishment: ['data'],
  setNameEstablishment: ['value'],
  setUfEstablishment: ['value'],
  setCityEstablishment: ['value'],
  setClearEstablishmentFilters: null,

  setClearLocationContent: null,
})

export const EstablishmentTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  establishments: { content: [], total: 0, pageCount: 0 },
  establishmentsPage: 0,
  loadingLocation: true,
  fetchingMoreLocation: false,
  reloadLocation: false,

  establishmentDetails: {},
  loadingEstablishmentDetails: true,

  ufCityLocation: { uf: [], city: [] },
  loadingUfCityLocation: true,

  modalFiltersEstablishment: false,
  filtersEstablishment: {},
  nameEstablishment: "",
  ufEstablishment: "",
  cityEstablishment: "",
})

const establishmentsSuccess = (state, { data }) =>
  !state.establishmentsPage
  ? state.merge({ establishments: data })
  : state.merge({ establishments: {
      total: data.total,
      pageCount: data.pageCount,
      content: state.establishments.content.concat(data.content)
    }})
const setLocationPage = (state, { value }) => state.merge({ establishmentsPage: value })
const setLoadingLocation = (state, { bool }) => state.merge({ loadingLocation: bool })
const setFetchingMoreLocation = (state, { bool }) => state.merge({ fetchingMoreLocation: bool })
const setReloadLocation = (state, { bool }) => state.merge({ reloadLocation: bool })

const establishmentDetailsSuccess = (state, { data }) => state.merge({ establishmentDetails: data })
const setLoadingEstablishmentDetails = (state, { bool }) => state.merge({ loadingEstablishmentDetails: bool })

const ufCityLocationSuccess = (state, { data }) => state.merge({ ufCityLocation: data })
const setLoadingUfCityLocation = (state, { bool }) => state.merge({ loadingUfCityLocation: bool })

const setModalFiltersEstablishment = (state, { bool }) => state.merge({ modalFiltersEstablishment: bool })
const setFiltersEstablishment = (state, { data }) => state.merge({ filtersEstablishment: data })
const setNameEstablishment = (state, { value }) => state.merge({ nameEstablishment: value })
const setUfEstablishment = (state, { value }) => state.merge({ ufEstablishment: value })
const setCityEstablishment = (state, { value }) => state.merge({ cityEstablishment: value })
const setClearEstablishmentFilters = (state) => state.merge({
  filtersEstablishment: {},
  nameEstablishment: "",
  ufEstablishment: "",
  cityEstablishment: "",
})

const setClearLocationContent = (state) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ESTABLISHMENTS_SUCCESS]: establishmentsSuccess,
  [Types.SET_ESTABLISHMENTS_PAGE]: setLocationPage,
  [Types.SET_LOADING_ESTABLISHMENTS]: setLoadingLocation,
  [Types.SET_FETCHING_MORE_ESTABLISHMENTS]: setFetchingMoreLocation,
  [Types.SET_RELOAD_ESTABLISHMENTS]: setReloadLocation,

  [Types.ESTABLISHMENT_DETAILS_SUCCESS]: establishmentDetailsSuccess,
  [Types.SET_LOADING_ESTABLISHMENT_DETAILS]: setLoadingEstablishmentDetails,

  [Types.UF_CITY_ESTABLISHMENTS_SUCCESS]: ufCityLocationSuccess,
  [Types.SET_LOADING_UF_CITY_ESTABLISHMENTS]: setLoadingUfCityLocation,

  [Types.SET_MODAL_FILTERS_ESTABLISHMENT]: setModalFiltersEstablishment,
  [Types.SET_FILTERS_ESTABLISHMENT]: setFiltersEstablishment,
  [Types.SET_NAME_ESTABLISHMENT]: setNameEstablishment,
  [Types.SET_UF_ESTABLISHMENT]: setUfEstablishment,
  [Types.SET_CITY_ESTABLISHMENT]: setCityEstablishment,
  [Types.SET_CLEAR_ESTABLISHMENT_FILTERS]: setClearEstablishmentFilters,

  [Types.SET_CLEAR_ESTABLISHMENTS_CONTENT]: setClearLocationContent,
})
