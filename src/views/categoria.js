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
    console.log('did,,,')
    this.props.getProductosPorCategoria(this.props.match.params.id)
  }

  componentWillMount() {
    console.log('will,,,')
    // if (
    //   this.props.productos.categoria_seleccionada !== this.props.match.params.id
    // ) {
    //   this.props.productos.categoria = []
    // }
  }

  componentWillReceiveProps(newProps) {
    console.log('...')
    if (this.props.match.params.id !== newProps.match.params.id) {
      // this.props.productos.categoria = []
      // this.props.toggleLoading(true)
      this.props.getProductosPorCategoria(newProps.match.params.id)
    }
  }

  renderProductos() {
    return this.props.productos.categoria.map((producto, key) => {
      return <Producto producto={producto} link key={key} />
    })
  }

  render() {
    console.log(this.props)
    if (
      this.props.productos.categoria.length <= 0 ||
      this.props.productos.categoria_seleccionada !== this.props.match.params.id
    ) {
      return (
        <div>
          <LoadingCard cantidad={5} />
        </div>
      )
    }
    // console.log(this.props.productos.categoria)
    // let isCategoria = false
    // if (this.props.productos.categoria.length === 0) {
    //   isCategoria = false
    // } else if (
    //   Number(this.props.match.params.id) ===
    //   Number(this.props.productos.categoria.id)
    // ) {
    //   isCategoria = true
    // }

    // return !isCategoria ? (
    //   <LoadingCard cantidad={5} />
    // ) : (
    //   <div>{this.renderProductos()}</div>
    // )
    // this.props.toggleLoading(false)
    return <div>{this.renderProductos()}</div>
  }
}

function mapDispatchToProps({ productos, carrito }) {
  return { carrito, productos }
}

export default connect(mapDispatchToProps, {
  getProductosPorCategoria,
  toggleLoading
})(Categoria)
