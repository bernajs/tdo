import { IS_LOADING } from './types'

export const toggleLoading = state => {
  console.log(state)
  return { type: IS_LOADING, payload: state }
}
