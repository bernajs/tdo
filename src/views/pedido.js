import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PerfilForm } from '../components'
import { getPedido } from '../actions/pedido_actions'
import { Col, Divider, Icon, Layout, List, Row } from 'antd'
const { Content } = Layout

class Pedido extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
    this.state = { cargando: false }
  }

  componentDidMount() {
    this.props.getPedido(this.props.match.params.id)
  }

  renderProductos() {
    return this.props.pedido.seleccionado.line_items.map(producto => {
      return (
        <List.Item key={producto.id}>
          <Link to={`/producto/${producto.id}`}>
            <span>{`${producto.name} `}</span>{' '}
            <span style={{ color: 'lightgray' }}> | </span>
            <span>{`${producto.quantity} x $${producto.price}`}</span>
          </Link>
        </List.Item>
      )
    })
  }

  render() {
    const { seleccionado } = this.props.pedido
    return Object.keys(seleccionado).length > 0 &&
      seleccionado.id === Number(this.props.match.params.id) ? (
      <div className="pedido">
        <Row>
          <Col span={24}>
            <Divider>Detalles del pedido</Divider>
            <span>{`Total: $${seleccionado.total}`}</span>
            <br />
            <span>{`Productos: ${seleccionado.line_items.length}`}</span>
            <br />
            <span>{`Estado del pedido: ${seleccionado.status}`}</span>
          </Col>
          <Col span={24}>
            <Divider>Datos del envío</Divider>
            <span>
              {`Nombre: ${seleccionado.shipping.first_name} ${
                seleccionado.shipping.last_name
              }`}
            </span>
            <br />
            <span>{`Dirección: ${seleccionado.shipping.address_1}, ${
              seleccionado.shipping.city
            }, ${seleccionado.shipping.state}, ${
              seleccionado.shipping.post_code
            }`}</span>
          </Col>
          <Col span={24}>
            <Divider>Productos</Divider>
            <List size="small">{this.renderProductos()}</List>
          </Col>
        </Row>
      </div>
    ) : (
      <Row type="flex" align="middle" className="center-text">
        <Col span={24}>
          <Icon type="loading" />
        </Col>
      </Row>
    )
  }
}

function mapDispatchToProps({ pedido }) {
  return { pedido }
}

export default connect(mapDispatchToProps, { getPedido })(Pedido)
