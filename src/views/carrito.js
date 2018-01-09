import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Icon, Input, Layout, message, Row, Col } from 'antd'
import { CarritoItem } from '../components'
import { enviarPedido, vaciarCarrito } from '../actions/carrito_actions'
const { Footer } = Layout

class Carrito extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
    this.enviarPedido = this.enviarPedido.bind(this)
    this.atras = this.atras.bind(this)
    this.siguiente = this.siguiente.bind(this)
    this.state = {
      paso: 0,
      status: 'to-top',
      total: 0,
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
      }
    }
  }

  componentDidMount() {
    this.getTotal(this.props.carrito)
  }

  componentWillReceiveProps(newProps) {
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
      billing: this.state.billing,
      shipping: this.state.shipping,
      line_items: productos
    }
    this.setState({ status: 'loading' })
    const result = await this.props.enviarPedido({
      uid: this.props.auth.uid,
      pedido
    })
    if (result) {
      const body = JSON.parse(result.body)
      this.setState({ status: 'check-circle' })
      this.props.vaciarCarrito()
      message.success(`Tu pedido se ha creado con el id #${body.id}`, 10, () =>
        console.log('cerrado')
      )
    }
  }

  renderUsuarioInfo() {
    const { shipping } = this.state
    return (
      <div>
        <Form.Item label="Nombre:">
          <Input
            defaultValue={`${shipping.first_name} ${shipping.last_name}`}
          />
        </Form.Item>
        <Form.Item label="Dirección:">
          <Input defaultValue={shipping.address_1} />
        </Form.Item>
        <Form.Item label="Ciudad:">
          <Input defaultValue={shipping.city} />
        </Form.Item>
        <Form.Item label="Estado:">
          <Input defaultValue={shipping.state} />
        </Form.Item>
        <Form.Item label="Código postal:">
          <Input defaultValue={shipping.postcode} />
        </Form.Item>
      </div>
    )
  }

  siguiente() {
    let { paso } = this.state
    paso < 2 && this.setState({ paso: paso + 1 })
  }

  atras() {
    let { paso } = this.state
    paso > 0 && this.setState({ paso: paso - 1 })
  }

  render() {
    if (Object.keys(this.props.carrito).length > 0) {
      return (
        <div>
          <div className="carrito-container">
            {this.state.paso === 0 && this.renderProductos()}
            {this.state.paso === 1 && (
              <div>Aqui va la información del billing</div>
            )}
            {this.state.paso === 2 && (
              <div>
                <Form>{this.renderUsuarioInfo()}</Form>
              </div>
            )}
          </div>
          <Footer className="carrito-footer">
            <Row type="flex" justify="space-around" align="middle">
              <Col span={24} className="carrito-precio-col">
                <h1 className="carrito-precio">Total: ${this.state.total}</h1>
              </Col>
              <Col span={24}>
                <Button.Group size="large" className="carrito-grupo-de-botones">
                  <Button
                    onClick={this.atras}
                    disabled={this.state.paso === 0 && true}
                    type="primary"
                    className="carrito-atras-siguiente-btn"
                  >
                    <Icon type="left" />Atrás
                  </Button>
                  {this.state.paso < 2 ? (
                    <Button
                      onClick={this.siguiente}
                      type="primary"
                      className="carrito-atras-siguiente-btn"
                    >
                      Siguiente<Icon type="right" />
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={this.state.status}
                      onClick={this.enviarPedido}
                      className="carrito-atras-siguiente-btn"
                    >
                      Enviar pedido
                    </Button>
                  )}
                </Button.Group>
              </Col>
            </Row>
          </Footer>
        </div>
      )
    }
    return <div>Su carrito está vacio</div>
  }
}

function mapDispatchToProps({ auth, carrito }) {
  return { auth, carrito }
}

export default connect(mapDispatchToProps, { enviarPedido, vaciarCarrito })(
  Carrito
)
