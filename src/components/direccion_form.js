import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actualizarDireccion, getDireccion } from '../actions/perfil_actions'
import { Button, Col, Form, Icon, Input, Layout, message, Row } from 'antd'
const { Item } = Form
const { Content } = Layout

class DireccionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calle: { value: '', label: '' },
      numero: { value: '', label: '' },
      colonia: { value: '', label: '' },
      ciudad: { value: '', label: '' },
      estado: { value: '', label: '' },
      cp: { value: '', label: '' },
      loading: false,
      button: true
    }
    this.actualizarDireccion = this.actualizarDireccion.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount() {
    this.props.getDireccion(this.props.uid)
    this.setState({ uid: this.props.uid })
  }

  componentWillReceiveProps(props) {
    const { direccion } = props
    console.log(props)
    console.log(this.props)
    this.setState({
      calle: { value: direccion.calle, label: '' },
      numero: { value: direccion.numero, label: '' },
      colonia: { value: direccion.colonia, label: '' },
      ciudad: { value: direccion.ciudad, label: '' },
      cp: { value: direccion.cp, label: '' },
      estado: { value: direccion.estado, label: '' }
    })
  }

  async actualizarDireccion() {
    this.setState({ loading: true })
    const response = await this.props.actualizarDireccion(this.state)
    this.setState({ loading: false })
    console.log(response)
    console.log(this.props)
    if (response) {
      this.props.mensaje
        ? message.success(this.props.mensaje)
        : this.props.history.push('/')
    }
  }

  handleInput(e) {
    const name = e.target.name
    let value = e.target.value

    value.length < 6
      ? this.setState({ [name]: { value, label: 'error' }, button: true })
      : this.setState({ [name]: { value, label: '' }, button: false })

    name === 'correo' &&
      (!this.validateMail(value)
        ? this.setState({ [name]: { value, label: 'error' }, button: true })
        : this.setState({ [name]: { value, label: '' }, button: false }))

    if (name === 'celular') {
      value = value.replace(/[^0-9]/g, '')
      this.setState({ [name]: { value, label: '' } })
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="actualizarDireccion">
        <Layout>
          <Content style={{ background: '#fff' }}>
            <Row>
              <Col span={24}>
                <Form>
                  <Item validateStatus={this.state.calle.label}>
                    <Input
                      placeholder="Calle"
                      value={this.state.calle.value}
                      name="calle"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.numero.label}>
                    <Input
                      placeholder="Número"
                      name="numero"
                      value={this.state.numero.value}
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="mobile"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.colonia.label}>
                    <Input
                      placeholder="Colonia"
                      value={this.state.colonia.value}
                      name="colonia"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.ciudad.label}>
                    <Input
                      placeholder="Ciudad"
                      value={this.state.ciudad.value}
                      name="ciudad"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="unlock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.estado.label}>
                    <Input
                      placeholder="Estado"
                      value={this.state.estado.value}
                      name="estado"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.cp.label}>
                    <Input
                      placeholder="Código postal"
                      value={this.state.cp.value}
                      name="cp"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                </Form>
              </Col>
              <Col span={24}>
                <Button
                  onClick={this.actualizarDireccion}
                  type="primary"
                  loading={this.state.loading}
                  className="fw"
                  disabled={this.state.button}
                >
                  Guardar dirección
                </Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    )
  }
}

function mapDispatchToProps({ direccion }) {
  return { direccion }
}

export default connect(mapDispatchToProps, {
  actualizarDireccion,
  getDireccion
})(DireccionForm)
