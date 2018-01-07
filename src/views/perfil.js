import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cerrarSesion } from '../actions/auth_acions'
import { actualizarPerfil } from '../actions/perfil_actions'
import { PerfilForm } from '../components'
import { Col, Divider, Icon, Radio, Row, Tabs } from 'antd'
const { TabPane } = Tabs
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Perfil extends Component {
  // constructor(props) {
  //   super(props)
  //   this.cerrarSesion = this.cerrarSesion.bind(this)
  // }

  componentWillMount() {
    const usuario = this.props.auth
    this.setState({ ...usuario })
  }

  // cerrarSesion() {
  //   this.props.cerrarSesion(this.props.history)
  // }

  render() {
    return (
      <div className="perfil-view">
        <Row type="flex" justify="center" />
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane
                tab={
                  <span>
                    <Icon type="user" /> Perfil
                  </span>
                }
                key="1"
              >
                <Row>
                  <Col span={24}>
                    <PerfilForm
                      titulo="Guardar"
                      action={this.props.actualizarPerfil}
                      usuario={this.state}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Divider />
                  </Col>
                  <Col span={24} className="center-text">
                    <span onClick={this.props.cerrarSesion}>Cerrar sesión</span>
                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="home" />Dirección
                  </span>
                }
                key="2"
              />
              <TabPane
                tab={
                  <span>
                    <Icon type="exception" />Pedidos
                  </span>
                }
                key="3"
              />
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchToProps({ auth }) {
  return { auth }
}

export default connect(mapDispatchToProps, { actualizarPerfil, cerrarSesion })(
  Perfil
)
