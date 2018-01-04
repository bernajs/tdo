import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Button, Icon, message, Steps } from 'antd'
import { LoadingCard, CarritoItem } from '../components'
import { enviarPedido, vaciarCarrito } from '../actions/carrito_actions'
const { Step } = Steps

class Carrito extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
    this.enviarPedido = this.enviarPedido.bind(this)
    this.state = { paso: 0, status: 'to-top', total: 0 }
  }

  componentDidMount() {
    this.setState({ paso: Number(this.props.match.params.paso) })
    this.getTotal(this.props.carrito)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ paso: Number(newProps.match.params.paso) })
    this.getTotal(newProps.carrito)
  }

  getTotal(carrito) {
    let total = 0
    for (const producto in carrito) {
      total +=
        Number(carrito[producto].cantidad) * Number(carrito[producto].price)
    }
    total = total.toFixed(2)
    this.setState({ total })
  }

  renderProductos() {
    let items = []
    for (const producto in this.props.carrito) {
      items.push(
        <CarritoItem producto={this.props.carrito[producto]} key={producto} />
      )
    }
    return items
  }

  async enviarPedido() {
    let productos = []
    for (const producto in this.props.carrito) {
      productos.push({
        product_id: producto,
        quantity: this.props.carrito[producto].cantidad
      })
    }
    const pedido = {
      billing: {
        first_name: 'John',
        last_name: 'Doe',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
        email: 'luisg@mobkii.com',
        phone: '(555) 555-5555'
      },
      shipping: {
        first_name: 'John',
        last_name: 'Doe',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US'
      },
      line_items: productos
    }
    this.setState({ status: 'loading' })
    const result = await this.props.enviarPedido(pedido)
    if (result) {
      const body = JSON.parse(result.body)
      console.log(body)
      this.setState({ status: 'check-circle' })
      this.props.vaciarCarrito()
      message.success(`Tu pedido se ha creado con el id #${body.id}`, 10, () =>
        console.log('cerrado')
      )
    }
  }

  goToUrl(paso) {
    this.props.history.push(`/carrito/${paso}`)
  }

  render() {
    if (Object.keys(this.props.carrito).length > 0) {
      return (
        <div>
          <h4>Total: $ {this.state.total}</h4>
          <Steps current={this.state.paso}>
            <Step
              onClick={this.goToUrl.bind(this, 0)}
              title="Productos"
              icon={<Icon type="schedule" />}
            />
            <Step
              onClick={this.goToUrl.bind(this, 1)}
              title="Billing"
              icon={<Icon type="solution" />}
            />
            <Step
              onClick={this.goToUrl.bind(this, 2)}
              title="Terminar pedido"
              icon={<Icon type="smile-o" />}
            />
          </Steps>
          <div>
            {this.state.paso === 0 && this.renderProductos()}
            {this.state.paso === 1 && (
              <div>Aqui va la información del billinf</div>
            )}
            {this.state.paso === 2 && (
              <div>
                <Button
                  type="primary"
                  icon={this.state.status}
                  onClick={this.enviarPedido}
                >
                  Enviar pedido
                </Button>
              </div>
            )}
          </div>
        </div>
      )
    }
    return <div>Su carrito está vacio</div>
  }
}

function mapDispatchToProps({ carrito }) {
  return { carrito }
}

export default connect(mapDispatchToProps, { enviarPedido, vaciarCarrito })(
  Carrito
)
