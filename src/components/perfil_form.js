import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Button,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Layout,
  message,
  Row
} from 'antd'
const { Item } = Form
const { Content } = Layout

class PerfilForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nombre: { value: '', label: '' },
      celular: { value: '', label: '' },
      correo: { value: '', label: '' },
      confirmar: { value: '', label: '' },
      contrasena: { value: '', label: '' },
      loading: false,
      button: true
    }
    this.registro = this.registro.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentWillMount() {
    const { usuario } = this.props
    this.props.usuario &&
      this.setState({
        uid: usuario.uid,
        button: false,
        nombre: { value: usuario.nombre, label: '' },
        celular: { value: usuario.celular, label: '' },
        correo: { value: usuario.correo, label: '' },
        confirmar: { value: usuario.contrasena, label: '' },
        contrasena: { value: usuario.contrasena, label: '' }
      })
  }

  async registro() {
    if (this.state.contrasena.value !== this.state.confirmar.value) {
      message.error('Las contraseñas no coinciden')
      console.log(this.state)
      return
    }
    this.setState({ loading: true })
    const response = await this.props.action(this.state)
    this.setState({ loading: false })
    this.props.usuario
      ? message.success('Perfil actualizado')
      : this.props.history.push('/')
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

    name === 'celular' &&
      ((value = value.replace(/[^0-9\.]/g, '')),
      this.setState({ [name]: { value, label: '' } }))
  }

  validateMail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
  }

  render() {
    console.log(this.state)
    return (
      <div className="registro">
        <Layout>
          <Content style={{ background: '#fff' }}>
            <Row>
              <Col span={24}>
                <Form>
                  <Item validateStatus={this.state.nombre.label}>
                    <Input
                      placeholder="Nombre completo"
                      value={this.state.nombre.value}
                      name="nombre"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.celular.label}>
                    <Input
                      placeholder="Celular"
                      name="celular"
                      value={this.state.celular.value}
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="mobile"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.correo.label}>
                    <Input
                      placeholder="Correo"
                      value={this.state.correo.value}
                      name="correo"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.contrasena.label}>
                    <Input
                      placeholder="Contraseña"
                      value={this.state.contrasena.value}
                      name="contrasena"
                      type="password"
                      onChange={this.handleInput}
                      prefix={
                        <Icon
                          type="unlock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  </Item>
                  <Item validateStatus={this.state.confirmar.label}>
                    <Input
                      placeholder="Confirmar contraseña"
                      value={this.state.confirmar.value}
                      name="confirmar"
                      type="password"
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
                  onClick={this.registro}
                  type="primary"
                  loading={this.state.loading}
                  className="fw"
                  disabled={this.state.button}
                >
                  {this.props.titulo}
                </Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    )
  }
}

export default connect(null)(PerfilForm)
