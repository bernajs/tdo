import React from 'react'
import { push as Slider } from 'react-burger-menu'
import { connect } from 'react-redux'
import { getCategorias } from '../actions/categorias_actions'
import { Link, NavLink } from 'react-router-dom'
import { Icon, Menu } from 'antd'
const { SubMenu } = Menu

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.stateChange = this.stateChange.bind(this)
  }
  componentDidMount() {
    this.props.getCategorias()
  }

  toggleMenu() {
    console.log(this.state)
    this.setState({ isOpen: !this.state.isOpen })
    console.log(this.state)
  }

  stateChange({ isOpen }) {
    this.setState({ isOpen })
  }

  renderMenuItems() {
    return this.props.categorias.map(categoria => {
      return (
        <Menu.Item key={categoria.id}>
          <NavLink
            onClick={this.toggleMenu}
            id={categoria.id}
            className="menu-item"
            activeClassName="active"
            exact
            to={`/categoria/${categoria.id}`}
          >
            {categoria.name}
          </NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    console.log(this.state)
    return (
      <Slider
        isOpen={this.state.isOpen}
        onStateChange={this.stateChange}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        className="slider"
      >
        <Menu theme="dark" mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="tags-o" />
                <span>Categorías</span>
              </span>
            }
          >
            {this.renderMenuItems()}
          </SubMenu>
          <Menu.Item key="2">
            <Link to="/perfil" onClick={this.toggleMenu}>
              <Icon type="user" />Perfil
            </Link>
          </Menu.Item>
        </Menu>
      </Slider>
    )
  }
}

function mapDispatchToProps({ categorias }) {
  return { categorias }
}

export default connect(mapDispatchToProps, { getCategorias })(Sidebar)
