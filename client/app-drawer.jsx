import React from 'react';
import Home from './pages/home';

class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menuOpen: true };
  }

  render() {
    if (this.props.menuOpen === true) {
      return <div className="app-drawer">
        <div>
          <h1 onClick={this.props.goHome}>Home</h1>
          <h1 onClick={this.props.openWatchlist}>Watchlist</h1>
        </div>
      </div>;
    } else {
      return <Home menuOpen={this.state.menuOpen} />;
    }
  }

}

export default AppDrawer;
