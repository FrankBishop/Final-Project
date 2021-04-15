import React from 'react';
import Home from './pages/home';
import Watchlist from './pages/watchlist';
import AppDrawer from './app-drawer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], watchlist: [], menuOpen: false, watchlistOpen: false, log: [] };
    this.setSearchResults = this.setSearchResults.bind(this);
    this.showWatchlist = this.showWatchlist.bind(this);
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openWatchlist = this.openWatchlist.bind(this);
    this.goHome = this.goHome.bind(this);
    this.deleteFromWatchlist = this.deleteFromWatchlist.bind(this);
    this.saveToLog = this.saveToLog.bind(this);
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
    this.setState({ menuOpen: false });
    this.setState({ watchlistOpen: true });
    this.setState({ searchResults: [] });
  }

  goHome() {
    this.setState({ menuOpen: false });
    this.setState({ watchlistOpen: false });
    this.setState({ searchResults: [] });
  }

  deleteFromWatchlist(episode) {
    const deleteId = parseInt(episode, 10);
    fetch(`/api/watchlist/${deleteId}`, {
      method: 'DELETE',
      body: JSON.stringify(episode)
    })
      .then(episode => {
        let entryToDelete;
        const watchlist = this.state.watchlist.slice();
        for (let i = 0; i < watchlist.length; i++) {
          if (watchlist[i].entryId === deleteId) {
            entryToDelete = i;
          }
        }
        watchlist.splice(entryToDelete, 1);
        this.setState({ watchlist });
      })
      .catch(err => {
        console.error(err);
      });
  }

  saveToLog(entry) {
    console.log('it went up', entry);
    fetch('/api/log', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(episode => {
        let log = this.state.log;
        log = this.state.log.concat(log);
        this.setState({ log });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.watchlistOpen === false || this.state.searchResults.length > 0) {
      return <div>
        <Home text="TV Diary" setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
          addToWatchlist={this.addToWatchlist} menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} goHome={this.goHome} saveToLog={this.saveToLog} />;
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} />;
      </div>;
    } else {
      return <div>
        <Watchlist menu={this.openMenu} setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} menuOpen={this.state.menuOpen === false} goHome={this.goHome} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} watchlist={this.state.watchlist} deleteFromWatchlist={this.deleteFromWatchlist} saveToLog={this.saveToLog} />;
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} />;
        </div>;
    }
  }
}
