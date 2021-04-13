import React from 'react';
import Home from './pages/home';
import Watchlist from './pages/watchlist';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], watchlist: [], menuOpen: false, watchlistOpen: false };
    this.setSearchResults = this.setSearchResults.bind(this);
    this.showWatchlist = this.showWatchlist.bind(this);
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openWatchlist = this.openWatchlist.bind(this);
    this.goHome = this.goHome.bind(this);
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

  addToWatchlist(episode) {
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

  setSearchResults(results) {
    this.setState({ searchResults: results });
  }

  showWatchlist(entries) {
    this.setState({ watchlist: entries });
  }

  openMenu() {
    if (this.state.menuOpen === true) {
      this.setState({ menuOpen: false });
    } else {
      this.setState({ menuOpen: true });
    }
  }

  openWatchlist() {
    this.setState({ watchlistOpen: true });
  }

  goHome() {
    this.setState({ watchlistOpen: false });
  }

  render() {
    if (this.state.watchlistOpen === false) {
      return <div>
        <Home text="TV Diary" setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
          addToWatchlist={this.addToWatchlist} menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} goHome = {this.goHome} />
      </div>;
    } else {
      return <Watchlist menu={this.openMenu} menuOpen={this.state.menuOpen === false} goHome={this.goHome} openWatchlist={this.openWatchlist}
        isWatchlistOpen={this.state.watchlistOpen} watchlist={this.state.watchlist} />;
    }
  }
}
