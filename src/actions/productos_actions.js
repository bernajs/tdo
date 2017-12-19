import { WooCommerce } from './index'
import {
  GET_PRODUCTOS_POR_CATEGORIA,
  GET_PRODUCTOS_DESTACADOS,
  GET_PRODUCTO
} from './types'

export const getProducto = producto => async dispatch => {
  const data = await WooCommerce.getAsync(`products/${producto}`)
  const result = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_PRODUCTO, payload: result })
}

export const getProductosDestacados = () => async dispatch => {
  const data = await WooCommerce.getAsync('products')
  const result = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_PRODUCTOS_DESTACADOS, payload: result })
}

export const getProductosPorCategoria = categoria => async dispatch => {
  const data = await WooCommerce.getAsync(`products?category=${categoria}`)
  const result = JSON.parse(data.toJSON().body)
  dispatch({
    type: GET_PRODUCTOS_POR_CATEGORIA,
    payload: { id: categoria, data: result }
  })
}
