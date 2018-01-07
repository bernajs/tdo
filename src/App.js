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
    Object.keys(this.props.auth).length === 0 &&
      this.props.history.push('/login')
  }

  componentWillUpdate(props) {
    console.log('auth', this.props)

    if (
      Object.keys(this.props.auth).length === 0 &&
      this.props.location.pathname !== '/login' &&
      this.props.location.pathname !== '/registro' &&
      this.props.location.pathname !== '/recuperar'
    ) {
      props.history.push('/login')
    }
  }

  render() {
    console.log(this.props.auth)
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

function mapDispatchToProps({ auth, general }) {
  return { auth, general }
}

export default withRouter(connect(mapDispatchToProps, { checkSession })(App))
// export default App
