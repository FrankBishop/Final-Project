import React from 'react';
// import AppDrawer from './app-drawer.jsx';

class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    // this.state = { menuOpen: false };
    this.handleClick = this.handleClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  render() {
    if (this.state.menuOpen === true) {
      return <div className="background">
        <div className="menu">
          <h1>Menu</h1>
          <h2 onClick={this.closeMenu}>About</h2>
          <h2 onClick={this.closeMenu}>Get Started</h2>
          <h2 onClick={this.closeMenu}>Sign In</h2>
        </div>
      </div>;
    }
    return <i className="fas fa-bars fa-2x" onClick={this.handleClick}></i>;
  }

  handleClick() {
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }
}

export default AppDrawer;
