import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gradient from 'random-gradient'
import { Avatar, Button, Col, Icon, List, Row } from 'antd'
import { connect } from 'react-redux'
import { getPedidos } from '../actions/pedido_actions'

class PedidoList extends Component {
  constructor(props) {
    super(props)
    this.renderPedidos = this.renderPedidos.bind(this)
  }

  componentDidMount() {
    this.props.getPedidos(this.props.uid)
  }

  renderPedidos() {
    return this.props.pedido.data.map(pedido => {
      // const bgGradient = { background: gradient('radial') }
      // console.log(bgGradient)
      return (
        <List.Item key={pedido.id}>
          <Link to={`pedido/${pedido.id}`} className="fw">
            <List.Item.Meta
              avatar={
                <Row
                  type="flex"
                  align="center"
                  className="pedido-item center-text"
                >
                  <Col span={24}>{pedido.id}</Col>
                </Row>
              }
              title={`Total: $${pedido.total}`}
              description={`${pedido.line_items.length} productos`}
            />
          </Link>
        </List.Item>
      )
    })
  }

  render() {
    console.log(this.props)
    return this.props.pedido.data.length > 0 ? (
      <List className="pedido-list">{this.renderPedidos()}</List>
    ) : (
      <Row
        type="flex"
        align="middle"
        className="center-text"
        style={{ height: 300 }}
      >
        <Col span={24}>
          <Icon type="loading" />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ pedido }) {
  return { pedido }
}

export default connect(mapStateToProps, { getPedidos })(PedidoList)
