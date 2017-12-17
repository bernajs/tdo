import {
  GET_PRODUCTOS_POR_CATEGORIA,
  GET_PRODUCTOS_DESTACADOS,
  GET_PRODUCTO
} from '../actions/types'

const INITIAL_STATE = {
  data: [],
  destacados: [],
  categoria: [],
  seleccionado: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTOS_POR_CATEGORIA:
      return { ...state, categoria: action.payload }
    case GET_PRODUCTOS_DESTACADOS:
      return { ...state, destacados: action.payload }
    case GET_PRODUCTO:
      return { ...state, seleccionado: action.payload }
    default:
      return state
  }
}
