import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Affix, Badge, Button, Icon } from 'antd'
import { connect } from 'react-redux'

class Carrito extends Component {
  render() {
    console.log(this.props.carrito)
    return (
      //   <Affix offsetTop={120} onChange={affixed => console.log(affixed)}>
      <Link to="/carrito">
        <Button type="primary" shape="circle" icon="shopping-cart">
          <Badge count={Object.keys(this.props.carrito).length} />
        </Button>
      </Link>
      //   </Affix>
    )
  }
}

function mapStateToProps({ carrito }) {
  return { carrito }
}

export default connect(mapStateToProps)(Carrito)
