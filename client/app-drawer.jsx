import React from 'react';
import Home from './pages/home';
import Watchlist from './pages/watchlist';

class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menuOpen: true };
    this.goHome = this.goHome.bind(this);
  }

  render() {
    if (this.props.menuOpen === true) {
      return <div className="app-drawer">
        <div>
          <h1 onClick={this.goHome}>Home</h1>
          <h1 onClick={this.props.OpenWatchlist}>Watchlist</h1>
        </div>
      </div>;
    } else {
      return <Home menuOpen={this.state.menuOpen} />;
    }
  }

  goHome() {
    this.setState({ menuOpen: false });
  }

}

export default AppDrawer;
