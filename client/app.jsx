import React from 'react';
import Home from './pages/home';
import AppDrawer from './app-drawer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], watchlist: [], menuOpen: false };
    this.SetSearchResults = this.SetSearchResults.bind(this);
    this.ShowWatchlist = this.ShowWatchlist.bind(this);
    this.AddToWatchlist = this.AddToWatchlist.bind(this);
    this.OpenMenu = this.OpenMenu.bind(this);
  }

  componentDidMount() {
    this.getWatchlist();
  }

  getWatchlist() {
    fetch('/api/watchlist')
      .then(response => response.json())
      .then(watchlist => this.setState({ watchlist }))
      .catch(err => {
        console.error(err);
      });
  }

  AddToWatchlist(episode) {
    fetch('/api/watchlist', {
      method: 'POST',
      body: JSON.stringify(episode),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(episode => {
        const watchlist = this.state.watchlist.concat(episode);
        this.setState({ watchlist });
      })
      .catch(err => {
        console.error(err);
      });
  }

  SetSearchResults(results) {
    this.setState({ searchResults: results });
  }

  ShowWatchlist(entries) {
    this.setState({ watchlist: entries });
  }

  OpenMenu() {
    if (this.state.menuOpen === true) {
      console.log('it is true');
      this.setState({ menuOpen: false });
    } else {
      console.log('it is false');
      this.setState({ menuOpen: true });
    }
    // this.render() {
    //   <AppDrawer />
    // }
  }

  render() {
    return <div>
      <Home text="TV Diary" SetSearchResults={this.SetSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
        AddToWatchlist={this.AddToWatchlist} menu={this.OpenMenu} menuOpen={this.state.menuOpen} />
      {/* <AppDrawer menu={this.OpenMenu} menuOpen={this.state.menuOpen}/> */}
    </div>;
  }
}
