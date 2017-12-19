import { combineReducers } from 'redux'
import categorias from './categorias_reducer'
import productos from './productos_reducer'
import general from './general_reducer'
import carrito from './carrito_reducer'

export default combineReducers({ carrito, categorias, general, productos })
