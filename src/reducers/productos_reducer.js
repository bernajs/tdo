import {
  GET_PRODUCTOS_POR_CATEGORIA,
  GET_PRODUCTOS_DESTACADOS,
  GET_PRODUCTO
} from '../actions/types'

const INITIAL_STATE = {
  data: [],
  destacados: [],
  categoria: [],
  categoria_seleccionada: 0,
  seleccionado: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTOS_POR_CATEGORIA:
      return {
        ...state,
        categoria_seleccionada: action.payload.id,
        categoria: action.payload.data
      }
    case GET_PRODUCTOS_DESTACADOS:
      return { ...state, destacados: action.payload }
    case GET_PRODUCTO:
      return { ...state, seleccionado: action.payload }
    default:
      return state
  }
}
