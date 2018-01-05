import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  Carrito,
  Categoria,
  Categorias,
  Inicio,
  Perfil,
  Producto
} from '../views'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/producto/:id" component={Producto} />
          <Route path="/categoria/:id" component={Categoria} />
          <Route path="/categorias" component={Categorias} />
          <Route path="/carrito" component={Carrito} />
          <Route path="/perfil" component={Perfil} />
          <Route path="/" component={Inicio} />
        </Switch>
      </div>
    )
  }
}
