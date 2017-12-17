import { combineReducers } from 'redux'
import categorias from './categorias_reducer'
import productos from './productos_reducer'
import general from './general_reducer'

export default combineReducers({ general, categorias, productos })
