import React, { Component } from 'react'
import './App.css'
import { Routes } from './router'
import { Link, withRouter } from 'react-router-dom'
import { Sidebar, Carrito, HeaderBar } from './components'
import { checkSession } from './actions/auth_acions'
import { connect } from 'react-redux'
import { Alert, Layout, Spin } from 'antd'
const { Content } = Layout

class App extends Component {
  componentWillMount() {
    const session = this.props.checkSession()
    !session && this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

function mapDispatchToProps({ general }) {
  return { general }
}

export default withRouter(connect(mapDispatchToProps, { checkSession })(App))
// export default App
