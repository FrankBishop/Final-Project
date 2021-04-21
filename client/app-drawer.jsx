import React from 'react';

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
          <h1 onClick={this.props.openLog}>Diary</h1>
          <h1 onClick={this.props.openWatchlist}>Watchlist</h1>
          <h1 onClick={this.props.signIn}>Sign In</h1>
          <h1 onClick={this.props.signUp}>Sign Up</h1>
        </div>
      </div>;
    } else {
      return <div className="hidden">
        <div>
          <h1 onClick={this.props.goHome}>Home</h1>
          <h1 onClick={this.props.openLog}>Diary</h1>
          <h1 onClick={this.props.openWatchlist}>Watchlist</h1>
          <h1 onClick={this.props.signIn}>Sign In</h1>
          <h1 onClick={this.props.signUp}>Sign Up</h1>
        </div>
      </div>;

    }
  }

}

export default AppDrawer;
