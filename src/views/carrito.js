import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Icon, Steps } from 'antd'
import { LoadingCard, CarritoItem } from '../components'
const { Step } = Steps

class Carrito extends Component {
  constructor(props) {
    super(props)
    this.renderProductos = this.renderProductos.bind(this)
  }

  renderProductos() {
    // let carritos = _.forIn(this.props.carrito, producto => {
    //   return <CarritoItem />
    // })
    let items = []
    for (const producto in this.props.carrito) {
      //   if (this.props.carrito[producto].cantidad > 0) {
      items.push(
        <CarritoItem producto={this.props.carrito[producto]} key={producto} />
      )
      //   }
    }
    return items
  }

  render() {
    if (Object.keys(this.props.carrito).length > 0) {
      return (
        <div>
          <Steps current={1}>
            <Step status="finish" title="Login" icon={<Icon type="user" />} />
            <Step
              status="finish"
              title="Verification"
              icon={<Icon type="solution" />}
            />
            <Step status="process" title="Pay" icon={<Icon type="loading" />} />
            <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
          </Steps>
          <div>{this.renderProductos()}</div>
        </div>
      )
    }
    return <div>Su carrito está vacio</div>
  }
}

function mapDispatchToProps({ carrito }) {
  return { carrito }
}

export default connect(mapDispatchToProps)(Carrito)
