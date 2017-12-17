import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductosPorCategoria } from '../actions/productos_actions'
import { toggleLoading } from '../actions/general_actions'
import { LoadingCard, Producto } from '../components'

class Categoria extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
  }

  componentDidMount() {
    this.props.getProductosPorCategoria(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    console.log('...')
    if (this.props.match.params.id !== newProps.match.params.id) {
      // this.props.toggleLoading(true)
      this.props.getProductosPorCategoria(newProps.match.params.id)
    }
  }

  renderProductos() {
    return this.props.productos.categoria.map((producto, key) => {
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
    if (this.props.productos.categoria.length <= 0) {
      return (
        <div>
          <LoadingCard />
        </div>
      )
    }
    // this.props.toggleLoading(false)
    return <div>{this.renderProductos()}</div>
  }
}

function mapDispatchToProps({ productos }) {
  return { productos }
}

export default connect(mapDispatchToProps, {
  getProductosPorCategoria,
  toggleLoading
})(Categoria)
