import React from 'react';
import Home from './pages/home';

class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menuOpen: true };
    this.goHome = this.goHome.bind(this);
    this.goToWatchlist = this.goToWatchlist.bind(this);
  }

  render() {
    if (this.props.menuOpen === true) {
      return <div className="app-drawer">
        <div>
          <h1 onClick={this.goHome}>Home</h1>
          <h1 onClick={this.goToWatchlist}>Watchlist</h1>
        </div>
      </div>;
    } else {
      return <Home menuOpen = {this.state.menuOpen} />;
      // return <div>
      //   <h1>This is a test</h1>
      // </div>
    }
  }

  goHome() {
    console.log('Home');
    this.setState({ menuOpen: false });
  }

  goToWatchlist() {
    console.log('Menu');
    this.setState({ menuOpen: false });
  }
}

export default AppDrawer;
