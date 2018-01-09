import React, { Component } from 'react'
import './App.css'
import { Routes } from './router'
import { withRouter } from 'react-router-dom'
import { checkSession } from './actions/auth_acions'
import { connect } from 'react-redux'

class App extends Component {
  componentWillMount() {
    Object.keys(this.props.auth).length === 0
      ? this.props.history.push('/login')
      : (this.props.location.pathname === '/login' ||
          this.props.location.pathname === '/registro' ||
          this.props.location.pathname === '/recuperar') &&
        (console.log('redirigiendo'),
        Object.keys(this.props.auth).length > 0 && this.props.history.push('/'))
  }

  componentWillUpdate(props) {
    if (
      Object.keys(props.auth).length === 0 &&
      props.location.pathname !== '/login' &&
      props.location.pathname !== '/registro' &&
      props.location.pathname !== '/recuperar'
    ) {
      props.history.push('/login')
    } else if (
      props.location.pathname === '/login' ||
      props.location.pathname === '/registro' ||
      props.location.pathname === '/recuperar'
    ) {
      console.log('redirigiendo')
      Object.keys(props.auth).length > 0 && props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

function mapDispatchToProps({ auth }) {
  return { auth }
}

export default withRouter(connect(mapDispatchToProps, { checkSession })(App))
// export default App
