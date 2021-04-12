import React from 'react';
import Home from './pages/home';
import Watchlist from './pages/watchlist';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], watchlist: [], menuOpen: false, watchlistOpen: false };
    this.SetSearchResults = this.SetSearchResults.bind(this);
    this.ShowWatchlist = this.ShowWatchlist.bind(this);
    this.AddToWatchlist = this.AddToWatchlist.bind(this);
    this.OpenMenu = this.OpenMenu.bind(this);
    this.OpenWatchlist = this.OpenWatchlist.bind(this);
    this.GoHome = this.GoHome.bind(this);
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
      this.setState({ menuOpen: false });
    } else {
      this.setState({ menuOpen: true });
    }
  }

  OpenWatchlist() {
    this.setState({ watchlistOpen: true });
  }

  GoHome() {
    this.setState({ watchlistOpen: false });
  }

  render() {
    if (this.state.watchlistOpen === false) {
      return <div>
        <Home text="TV Diary" SetSearchResults={this.SetSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
          AddToWatchlist={this.AddToWatchlist} menu={this.OpenMenu} menuOpen={this.state.menuOpen} OpenWatchlist={this.OpenWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} GoHome = {this.GoHome} />
      </div>;
    } else {
      return <Watchlist menu={this.OpenMenu} menuOpen={this.state.menuOpen === false} GoHome={this.GoHome} OpenWatchlist={this.OpenWatchlist}
        isWatchlistOpen={this.state.watchlistOpen} watchlist={this.state.watchlist} />;
    }
  }
}
