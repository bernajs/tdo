import { IS_LOADING } from '../actions/types'

const INITIAL_STATE = {
  isLoading: false,
  isMenuOpen: false
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}
