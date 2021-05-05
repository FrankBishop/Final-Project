import React from 'react';
import Home from './pages/home';
import Watchlist from './pages/watchlist';
import Diary from './pages/diary';
import AppDrawer from './app-drawer.jsx';
import SearchResults from './pages/search-results';
import ShowInfo from './pages/showinfo';
import EpisodeList from './pages/episode-list';
import EpisodeDetails from './pages/episode-details';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [], watchlist: [], menuOpen: false, watchlistOpen: false, log: [], logOpen: false, show: null, episodes: [], showEpisode: null, signUp: false, signIn: false, showName: null, signedIn: false, user: null, logonFailed: null, calling: false, noResults: false, networkError: false
    };
    this.setSearchResults = this.setSearchResults.bind(this);
    this.showWatchlist = this.showWatchlist.bind(this);
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openWatchlist = this.openWatchlist.bind(this);
    this.goHome = this.goHome.bind(this);
    this.deleteFromWatchlist = this.deleteFromWatchlist.bind(this);
    this.saveToLog = this.saveToLog.bind(this);
    this.getLog = this.getLog.bind(this);
    this.openLog = this.openLog.bind(this);
    this.setShow = this.setShow.bind(this);
    this.setEpisodes = this.setEpisodes.bind(this);
    this.setShowEpisode = this.setShowEpisode.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.signUp = this.signUp.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.noResults = this.noResults.bind(this);
    this.networkError = this.networkError.bind(this);
    this.networkErrorTryAgain = this.networkErrorTryAgain.bind(this);
    this.toggleCalling = this.toggleCalling.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidUpdate() {
    if (this.state.signedIn === true) {
      const userId = this.state.user;
      this.getWatchlist(userId);
      this.getLog(userId);
      this.setState({ signedIn: false });
    }
  }

  getWatchlist(userId) {
    const user = parseInt(userId, 10);
    fetch(`/api/watchlist/${user}`, {
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(watchlist => this.setState({ watchlist }))
      .catch(err => {
        console.error(err);
      });
  }

  getLog(userId) {
    const user = parseInt(userId, 10);
    fetch(`/api/log/${user}`, {
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(log => this.setState({ log }))
      .catch(err => {
        console.error(err);
      });
  }

  addToWatchlist(episode) {
    this.setState({ calling: true });
    fetch('/api/watchlist', {
      method: 'POST',
      body: JSON.stringify(episode),
      headers: {
        'Content-type': 'application/json',
        'X-Access-Token': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(episode => {
        this.toggleCalling();
        const watchlist = this.state.watchlist.concat(episode);
        this.setState({ watchlist });
      })
      .catch(err => {
        this.networkError();
        console.error(err);
      });
  }

  setShow(show) {
    this.setState({ show });
    this.setState({ searchResults: [] });
    this.setState({ showName: show.name });
    this.setState({ noResults: false });
  }

  setEpisodes(episodes) {
    this.setState({ episodes });
    this.setState({ show: null });
  }

  setShowEpisode(episode) {
    this.setState({ showEpisode: episode });
    this.setState({ episodes: [] });
  }

  setSearchResults(results) {
    this.setState({ menuOpen: false });
    this.setState({ logOpen: false });
    this.setState({ searchResults: results });
  }

  noResults() {
    this.setState({ noResults: true });
  }

  networkError() {
    this.setState({ networkError: true });
  }

  networkErrorTryAgain() {
    this.setState({ networkError: false });
    this.setState({ calling: false });
  }

  toggleCalling() {
    if (this.state.calling === true) {
      this.setState({ calling: false });
    } else {
      this.setState({ calling: true });
    }
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

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  openWatchlist() {
    this.setState({ menuOpen: false });
    this.setState({ watchlistOpen: true });
    this.setState({ searchResults: [] });
    this.setState({ logOpen: false });
    this.setState({ show: null });
    this.setState({ episodes: [] });
    this.setState({ showEpisode: null });
    this.setState({ signUp: false });
    this.setState({ signIn: false });
    this.setState({ menuOpen: false });
    this.setState({ calling: false });
  }

  openLog() {
    this.setState({ watchlistOpen: false });
    this.setState({ menuOpen: false });
    this.setState({ logOpen: true });
    this.setState({ searchResults: [] });
    this.setState({ show: null });
    this.setState({ episodes: [] });
    this.setState({ showEpisode: null });
    this.setState({ signUp: false });
    this.setState({ signIn: false });
    this.setState({ menuOpen: false });
    this.setState({ calling: false });
  }

  goHome() {
    this.setState({ menuOpen: false });
    this.setState({ watchlistOpen: false });
    this.setState({ searchResults: [] });
    this.setState({ logOpen: false });
    this.setState({ show: null });
    this.setState({ episodes: [] });
    this.setState({ showEpisode: null });
    this.setState({ signUp: false });
    this.setState({ signIn: false });
    this.setState({ menuOpen: false });
    this.setState({ calling: false });
    this.setState({ noResults: false });
  }

  deleteFromWatchlist(episode) {
    this.setState({ calling: true });
    const deleteId = parseInt(episode, 10);
    fetch(`/api/watchlist/${deleteId}`, {
      method: 'DELETE',
      body: JSON.stringify(episode),
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      }
    })
      .then(episode => {
        this.setState({ calling: false });
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
        this.networkError();
        console.error(err);
      });
  }

  saveToLog(entry) {
    this.setState({ calling: true });
    fetch('/api/log', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-type': 'application/json',
        'X-Access-Token': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(episode => {
        this.setState({ calling: false });
        let log = this.state.log;
        log = this.state.log.concat(episode);
        this.setState({ log });
      })
      .catch(err => {
        this.networkError();
        console.error(err);
      });
  }

  goToSignUp() {
    this.setState({ signIn: false });
    this.setState({ signUp: true });
    this.setState({ menuOpen: false });
    this.setState({ watchlistOpen: false });
    this.setState({ searchResults: [] });
    this.setState({ logOpen: false });
    this.setState({ show: null });
    this.setState({ episodes: [] });
    this.setState({ showEpisode: null });
    this.setState({ calling: false });
  }

  signUp(user) {
    this.setState({ calling: true });
    fetch('/api/users/sign-up', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
        'X-Access-Token': localStorage.getItem('token')
      }
    })
      .then(response => {
        response.json();
        this.setState({ calling: false });
      })
      .then(user => {
        this.setState({ signedIn: true });
        this.setState({ logonFailed: false });
        this.setState({ user: user.userId });
        this.setState({ signIn: false });
        JSON.stringify(user);
        localStorage.setItem('token', user.token);
      })
      .catch(err => {
        this.setState({ calling: false });
        console.error(err);
      });
  }

  goToSignIn() {
    this.setState({ signIn: true });
    this.setState({ menuOpen: false });
    this.setState({ watchlistOpen: false });
    this.setState({ searchResults: [] });
    this.setState({ logOpen: false });
    this.setState({ show: null });
    this.setState({ episodes: [] });
    this.setState({ showEpisode: null });
    this.setState({ signUp: false });
    this.setState({ calling: false });
  }

  signIn(user) {
    this.setState({ calling: true });
    fetch('/api/users/sign-in', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
        'X-Access-Token': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(user => {
        this.setState({ calling: false });
        this.setState({ logonFailed: false });
        this.setState({ user: user.user.userId });
        this.setState({ signedIn: true });
        this.setState({ signIn: false });
        JSON.stringify(user);
        localStorage.setItem('token', user.token);
      })
      .catch(err => {
        this.setState({ logonFailed: true });
        this.setState({ calling: false });
        console.error(err);
      });
  }

  signOut() {
    this.setState({
      searchResults: [], watchlist: [], menuOpen: false, watchlistOpen: false, log: [], logOpen: false, show: null, episodes: [], showEpisode: null, signUp: false, signIn: false, showName: null, signedIn: false, user: null, logonFailed: null, calling: false
    });
    this.goHome();
  }

  render() {
    if (this.state.watchlistOpen === false && this.state.logOpen === false && this.state.searchResults.length === 0 && this.state.show === null &&
      this.state.episodes.length === 0 && this.state.showEpisode === null && this.state.signUp === false && this.state.signIn === false && this.state.noResults === false) {
      return <div>
        <Home text="TV Diary" setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
          addToWatchlist={this.addToWatchlist} menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} goHome={this.goHome} saveToLog={this.saveToLog} openLog={this.openLog} user={this.state.user} noResults={this.noResults}
          networkError={this.networkError} networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          calling={this.state.calling} closeMenu={this.closeMenu} />;
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    } else if (this.state.searchResults.length > 0 || this.state.noResults === true) {
      return <div>
        <SearchResults text="TV Diary" setSearchResults={this.setSearchResults} results={this.state.searchResults} watchlist={this.state.watchlist}
          addToWatchlist={this.addToWatchlist} menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} goHome={this.goHome} saveToLog={this.saveToLog} openLog={this.openLog} setShow={this.setShow} user={this.state.user} noResults={this.noResults}
          networkError={this.networkError} networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          calling={this.state.calling} closeMenu={this.closeMenu}/>
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    } else if (this.state.logOpen === true) {
      return <div>
        <Diary menu={this.openMenu} setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} menuOpen={this.state.menuOpen === false} goHome={this.goHome} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} watchlist={this.state.watchlist} deleteFromWatchlist={this.deleteFromWatchlist} saveToLog={this.saveToLog} openLog={this.openLog} log={this.state.log}
          user={this.state.user} noResults={this.noResults} networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          calling={this.state.calling} networkError={this.networkError} closeMenu={this.closeMenu}/>
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    } else if (this.state.watchlistOpen === true) {
      return <div>
        <Watchlist menu={this.openMenu} setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} menuOpen={this.state.menuOpen === false} goHome={this.goHome} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} watchlist={this.state.watchlist} deleteFromWatchlist={this.deleteFromWatchlist} saveToLog={this.saveToLog} openLog={this.openLog} showName={this.state.showName}
          user={this.state.user} calling={this.state.calling} noResults={this.noResults} networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          networkError={this.networkError} closeMenu={this.closeMenu}/>;
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
        </div>;
    } else if (this.state.show !== null) {
      return <div>
        <ShowInfo text="TV Diary" setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
          addToWatchlist={this.addToWatchlist} menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} goHome={this.goHome} saveToLog={this.saveToLog} openLog={this.openLog} show={this.state.show}
          episodes={this.setEpisodes} setShow={this.setShow} user={this.state.user} noResults={this.noResults} networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          calling={this.state.calling} networkError={this.networkError} closeMenu={this.closeMenu}/>;
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    } else if (this.state.episodes.length > 0) {
      return <div>
        <EpisodeList text="TV Diary" setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
          addToWatchlist={this.addToWatchlist} menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} goHome={this.goHome} saveToLog={this.saveToLog} openLog={this.openLog} show={this.state.show}
          episodes={this.setEpisodes} episodesList={this.state.episodes} showEpisode={this.setShowEpisode} showName={this.state.showName} user={this.state.user}
          noResults={this.noResults} networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          calling={this.state.calling} networkError={this.networkError} closeMenu={this.closeMenu}/>;
      <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    } else if (this.state.signUp === true) {
      return <div>
        <SignUp menu={this.openMenu} menuOpen={this.state.menuOpen} signUp={this.signUp} goHome={this.goHome} calling={this.state.calling} noResults={this.noResults}
          networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling} networkError={this.networkError} closeMenu={this.closeMenu}/>;
      <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    } else if (this.state.signIn === true) {
      return <div>
        <SignIn menu={this.openMenu} menuOpen={this.state.menuOpen} signUp={this.signUp} goHome={this.goHome} signIn={this.signIn} logonFailed={this.state.logonFailed}
          setSearchResults={this.setSearchResults} networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          calling={this.state.calling} noResults={this.noResults} networkError={this.networkError} closeMenu={this.closeMenu} />;
      <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    } else {
      return <div>
        <EpisodeDetails text="TV Diary" setSearchResults={this.setSearchResults} searchResults={this.state.searchResults} watchlist={this.state.watchlist}
          addToWatchlist={this.addToWatchlist} menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist}
          isWatchlistOpen={this.state.watchlistOpen} goHome={this.goHome} saveToLog={this.saveToLog} openLog={this.openLog} show={this.state.show}
          episodes={this.setEpisodes} episodesList={this.state.episodes} showEpisode={this.state.showEpisode} user={this.state.user} noResults={this.noResults}
          networkErrorState={this.state.networkError} tryAgain={this.networkErrorTryAgain} toggleCalling={this.toggleCalling}
          calling={this.state.calling} networkError={this.networkError} closeMenu={this.closeMenu}/>;
        <AppDrawer menu={this.openMenu} menuOpen={this.state.menuOpen} openWatchlist={this.openWatchlist} goHome={this.goHome} openLog={this.openLog} signUp={this.goToSignUp}
          signIn={this.goToSignIn} user={this.state.user} signOut={this.signOut} />;
      </div>;
    }
  }
}
