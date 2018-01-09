import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cerrarSesion } from '../actions/auth_acions'
import { actualizarPerfil } from '../actions/perfil_actions'
import { DireccionForm, PerfilForm } from '../components'
import { Col, Divider, Icon, Row, Tabs } from 'antd'
const { TabPane } = Tabs

class Perfil extends Component {
  componentWillMount() {
    const usuario = this.props.auth
    this.setState({ ...usuario })
  }

  render() {
    console.log(this.props)
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
              >
                <DireccionForm uid={this.props.auth.uid} />
              </TabPane>
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
