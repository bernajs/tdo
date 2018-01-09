import { GET_DIRECCION, ACTUALIZAR_DIRECCION } from '../actions/types'
// import { REHYDRATE, PURGE } from 'redux-persist'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_DIRECCION:
      return { ...action.payload }
    case ACTUALIZAR_DIRECCION:
      return { ...action.payload }
    // case REHYDRATE:
    //   // if (action.payload) {
    //   return action.payload.auth || {}
    // // }
    // // return {}
    // case PURGE:
    //   return {}
    default:
      return state
  }
}
