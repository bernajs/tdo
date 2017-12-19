import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducto } from '../actions/productos_actions'
import { Producto as ProductoComponent, LoadingCard } from '../components'

class Producto extends Component {
  componentDidMount() {
    this.props.getProducto(this.props.match.params.id)
  }

  render() {
    let isProducto = false
    if (Object.keys(this.props.seleccionado).length === 0) {
      isProducto = false
    } else if (
      Number(this.props.match.params.id) === Number(this.props.seleccionado.id)
    ) {
      isProducto = true
    }

    return !isProducto ? (
      <LoadingCard cantidad={1} />
    ) : (
      <div>
        <ProductoComponent
          id={this.props.match.params.id}
          producto={this.props.seleccionado}
        />
      </div>
    )
  }
}

function mapDispatchToProps({ productos }) {
  return { seleccionado: productos.seleccionado }
}

export default connect(mapDispatchToProps, { getProducto })(Producto)
