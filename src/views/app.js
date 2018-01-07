import React, { Component } from 'react'
import '../App.css'
import { Aplicacion } from '../router'
import { Link, withRouter } from 'react-router-dom'
import { Sidebar, Carrito } from '../components'
import { connect } from 'react-redux'
import { Alert, Layout, Spin } from 'antd'
const { Header, Content } = Layout

class Main extends Component {
  render() {
    return (
      <div>
        <Spin tip="Cargando..." spinning={this.props.general.isLoading}>
          <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            {this.props.general.alert.show && (
              <Alert
                message={this.props.general.alert.message}
                type={this.props.general.alert.type}
                showIcon
                closable
              />
            )}
            <Layout>
              <Header
                style={{
                  background: '#fff',
                  paddingLeft: 30,
                  textAlign: 'center'
                }}
              >
                <Carrito />
                <Link to="/">
                  <h2 style={{ display: 'inline', textAlign: 'center' }}>
                    TDO - Tienda
                  </h2>
                </Link>
              </Header>
              <Content style={{ margin: '10px' }}>
                <div
                  style={{ padding: 24, background: '#fff', minHeight: 360 }}
                >
                  <Aplicacion />
                </div>
              </Content>
            </Layout>
          </Layout>
        </Spin>
      </div>
    )
  }
}

function mapDispatchToProps({ general }) {
  return { general }
}

export default withRouter(connect(mapDispatchToProps)(Main))
// export default App
