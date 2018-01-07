import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actualizarPerfil } from '../actions/perfil_actions'
import { PerfilForm } from '../components'
import { Col, Icon, Radio, Row, Tabs } from 'antd'
const { TabPane } = Tabs
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Perfil extends Component {
  componentWillMount() {
    const usuario = JSON.parse(localStorage.getItem('user'))
    this.setState({ ...usuario })
  }
  render() {
    console.log(this.state)
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

export default connect(null, { actualizarPerfil })(Perfil)
