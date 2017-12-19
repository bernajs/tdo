import {
  AGREGAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  RESTAR_PRODUCTO,
  VACIAR_CARRITO
} from './types'

export const agregarProducto = producto => dispatch => {
  dispatch({ type: AGREGAR_PRODUCTO, payload: producto })
}

export const restarProducto = producto => dispatch => {
  dispatch({ type: RESTAR_PRODUCTO, payload: producto })
}

export const eliminarProducto = producto => dispatch => {
  dispatch({ type: ELIMINAR_PRODUCTO, payload: producto })
}

export const vaciarCarrito = producto => dispatch => {
  dispatch({ type: VACIAR_CARRITO })
}