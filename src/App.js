import React, { Component } from 'react'
import './App.css'
import Navigation from './router'
import { Link, withRouter } from 'react-router-dom'
import { Sidebar, Carrito } from './components'
import { connect } from 'react-redux'
import { Alert, Layout, Spin } from 'antd'
const { Header, Content } = Layout

class App extends Component {
  //   <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
  //   <Spin
  //     indicator={antIcon}
  //     style={{ width: '100%', height: 360, lineHeight: '360px' }}
  //   />
  // </div>
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
                  <Navigation />
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

export default withRouter(connect(mapDispatchToProps)(App))
// export default App
