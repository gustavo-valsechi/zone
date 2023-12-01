import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  indicateRequest: ['body', 'navigation', 'clear'],
  setLoadingIndicate: ['bool'],
})

export const IndicateTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loadingIndicate: false,
})

const setLoadingIndicate = (state, { bool }) => state.merge({ loadingIndicate: bool })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOADING_INDICATE]: setLoadingIndicate,
})
