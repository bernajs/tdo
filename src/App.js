import React, { Component } from 'react'
import './App.css'
import Navigation from './router'
import { withRouter } from 'react-router-dom'
import { Sidebar } from './components'
import { connect } from 'react-redux'
import { Layout, Spin } from 'antd'
const { Header, Content, Footer } = Layout

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
            <Layout>
              <Header style={{ background: '#fff', paddingLeft: 30 }}>
                <h2>Ant - Admin</h2>
              </Header>
              <Content style={{ margin: '10px' }}>
                <div
                  style={{ padding: 24, background: '#fff', minHeight: 360 }}
                >
                  <Navigation />
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
              </Footer>
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
