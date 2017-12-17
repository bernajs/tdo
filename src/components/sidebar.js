import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
import { getCategorias } from '../actions/categorias_actions'
import { NavLink } from 'react-router-dom'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  componentDidMount() {
    this.props.getCategorias()
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderMenuItems() {
    return this.props.categorias.map(categoria => {
      return (
        <NavLink
          id={categoria.id}
          key={categoria.id}
          className="menu-item"
          activeClassName="active"
          exact
          to={`/categoria/${categoria.id}`}
          onClick={this.toggleMenu}
        >
          {categoria.name}
        </NavLink>
      )
    })
  }

  render() {
    return <Menu isOpen={this.state.isOpen}>{this.renderMenuItems()}</Menu>
  }
}

function mapDispatchToProps({ categorias }) {
  return { categorias }
}

export default connect(mapDispatchToProps, { getCategorias })(Sidebar)
