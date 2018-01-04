import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Producto, Categoria, Categorias, Inicio, Carrito } from '../views'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/producto/:id" component={Producto} />
          <Route path="/categoria/:id" component={Categoria} />
          <Route path="/categorias" component={Categorias} />
          <Route path="/carrito/:paso" strict component={Carrito} />
          <Route path="/" component={Inicio} />
        </Switch>
      </div>
    )
  }
}
