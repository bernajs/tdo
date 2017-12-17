import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
const { Meta } = Card

export default class Producto extends Component {
  render() {
    return (
      <Link to={`/producto/${this.props.id}`} key={this.props.id}>
        <Card
          hoverable
          style={{ width: '100%', margin: '10px 0px' }}
          cover={<img alt={this.props.nombre} src={this.props.imagen} />}
        >
          <Meta
            title={this.props.nombre}
            description={this.props.descripcion}
          />
        </Card>
      </Link>
    )
  }
}
