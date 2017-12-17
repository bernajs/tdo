import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducto } from '../actions/productos_actions'
import { Producto as ProductoComponent, LoadingCard } from '../components'

class Producto extends Component {
  componentDidMount() {
    this.props.getProducto(this.props.match.params.id)
  }

  render() {
    if (Object.keys(this.props.seleccionado).length === 0) {
      return <LoadingCard />
    }
    console.log(this.props.seleccionado)
    return (
      <div>
        <ProductoComponent
          id={this.props.match.params.id}
          nombre={this.props.seleccionado.name}
          imagen={this.props.seleccionado.images[0].src}
          descripcion={this.props.seleccionado.description}
        />
      </div>
    )
  }
}

function mapDispatchToProps({ productos }) {
  return { seleccionado: productos.seleccionado }
}

export default connect(mapDispatchToProps, { getProducto })(Producto)
