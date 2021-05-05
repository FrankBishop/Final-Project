import React from 'react';

class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menuOpen: true };
    // this.close = this.close.bind(this);
  }

  // componentDidMount() {
  //   window.addEventListener('click', this.close)
  // }

  render() {
    if (this.props.menuOpen === true) {
      return <div className="app-drawer">
        <div className = "app-drawer-links">
          <a onClick={this.props.goHome}>Home</a>
          <a onClick={this.props.openLog}>Diary</a>
          <a onClick={this.props.openWatchlist}>Watchlist</a>
          {this.props.user === null &&
            < div className="app-drawer-links" >
              {<a onClick={this.props.signIn}>Sign In</a>}
              {<a onClick={this.props.signUp}>Sign Up</a>}
            </div>
          }
          {
            this.props.user !== null &&
            <a onClick={this.props.signOut}> Sign Out</a>
          }
        </div >
      </div >;
    } else {
      return <div className="hidden">
      </div>;

    }
  }

  // close() {
  //   console.log(event.target)
  // }

}

export default AppDrawer;
