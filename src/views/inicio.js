import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductosDestacados } from '../actions/productos_actions'
import { LoadingCard } from '../components'
import { Producto } from '../components'

class Inicio extends Component {
  constructor(props) {
    super(props)
    this.renderProducto = this.renderProducto.bind(this)
  }

  componentDidMount() {
    this.props.getProductosDestacados()
  }

  renderProducto() {
    return this.props.productos.destacados.map((producto, key) => {
      return (
        <Producto
          id={producto.id}
          nombre={producto.name}
          precio={producto.precio}
          imagen={producto.images[0].src}
          descirpcion={producto.descripcion}
          key={key}
        />
      )
    })
  }

  render() {
    if (this.props.productos.destacados.length <= 0) {
      return <LoadingCard />
    }
    console.log(this.props.productos)

    return <div>{this.renderProducto()}</div>
  }
}

function mapDispatchToProps({ productos }) {
  return { productos }
}

export default connect(mapDispatchToProps, { getProductosDestacados })(Inicio)