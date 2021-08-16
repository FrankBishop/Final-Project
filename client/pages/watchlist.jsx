import React from 'react';
import SearchForm from './search';
import DeleteModal from './delete-modal';
import LogModal from './log-modal';
import NetworkError from './network-error';

class Watchlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openModal: false, episodeToDelete: null, logModalOpen: false, episodeToLog: null, searching: false };
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openLogModal = this.openLogModal.bind(this);
    this.toggleLogModal = this.toggleLogModal.bind(this);
    this.episodeToLog = this.episodeToLog.bind(this);
  }

  render() {
    const watchlistEntries = this.props.watchlist;
    const watchlistToRender = watchlistEntries.map(episode =>
      <div className="watchlist-result" key={episode.entryId} id={episode.entryId} >
        <div className="watchlist-image-holder">
          <img className="episodes-list-image" src={episode.image} alt={episode['episode name']} ></img>
        </div>
        <div className="watchlist-episode-info">
          <ul className="watch-show-title" value={episode.show} > {episode.show}  </ul>
          <ul className="watch-episode-title" value={episode['episode name']} > S{episode.season}E{episode.number} {episode['episode name']} </ul>
          <div className="watchlist-button-container">
            <button className="watchlist-log-button" onClick={this.openLogModal} disabled={this.props.calling === true} show={episode.show} name={episode['episode name']}
              season={episode.season} number={episode.number} image={episode.image} type="button">Log</button>
            <button onClick={this.openModal} disabled={this.props.calling === true} id={episode.entryId} className="watchlist-delete-button" type="submit">Delete</button>
          </div>
        </div>
      </div>
    );
    if (this.props.watchlist.length === 0) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <a className="header-text site-header" onClick={this.props.goHome}> TV Diary </a>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} noActorResults={this.props.noActorResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
          </div>
        </header>
        <main onClick={this.props.closeMenu}>
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} noActorResults={this.props.noActorResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
          </div>
          {this.props.networkErrorState === true &&
            <NetworkError tryAgain={this.props.tryAgain} toggleCalling={this.props.toggleCalling} />
          }
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            {this.props.user === null &&
              <h2 className="main-header header-text">Please sign in to access this feature</h2>
            }
            {this.props.user !== null &&
            <h2 className="main-header header-text"> Your Watchlist is Empty</h2>
            }
          </div>;
        </main>
        <footer onClick={this.props.closeMenu}>

        </footer>
      </div>;
    } else {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <a className="header-text site-header" onClick={this.props.goHome}> TV Diary </a>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
          </div>
        </header>
        <main onClick={this.props.closeMenu}>
          {this.props.calling === true &&
            <div className="loading-spinner"></div>
          }
          {this.props.networkErrorState === true &&
            <NetworkError tryAgain={this.props.tryAgain} toggleCalling={this.props.toggleCalling} />
          }
          {this.state.searching === true &&
            <div className="loading-spinner"></div>
          }
          {this.state.logModalOpen === true &&
            <LogModal toggleModal={this.toggleLogModal} showName={this.state.episodeToLog.showName} season={this.state.episodeToLog.season}
              number={this.state.episodeToLog.number} name={this.state.episodeToLog.name} saveToLog={this.props.saveToLog} image={this.state.episodeToLog.image}
              userId={this.state.episodeToLog.userId} />
          }
          {this.state.openModal === true &&
            <DeleteModal episodeToDelete={this.state.episodeToDelete} deleteFromWatchlist={this.props.deleteFromWatchlist} openModal={this.props.openModal}
              toggleModal={this.toggleModal} />
          }
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
          </div>
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            <ul className="list-results"> {watchlistToRender} </ul>
          </div>;
        </main>
        <footer onClick={this.props.closeMenu}>

        </footer>
      </div>;
    }
  }

  openModal(event) {
    const deleteId = event.target.getAttribute('id');
    this.setState({ openModal: true });
    this.setState({ episodeToDelete: deleteId });
  }

  toggleModal() {
    if (this.state.openModal === true) {
      this.setState({ openModal: false });
      this.setState({ episodeToDelete: null });
    } else {
      this.setState({ openModal: true });
    }
  }

  openLogModal(event) {
    this.setState({ logModalOpen: true });
    const showName = event.target.getAttribute('show');
    const episodeName = event.target.getAttribute('name');
    const season = event.target.getAttribute('season');
    const number = event.target.getAttribute('number');
    const image = event.target.getAttribute('image');
    const episode = {
      showName: showName,
      season: season,
      number: number,
      name: episodeName,
      image: image
    };
    this.setState({ episodeToLog: episode });
  }

  toggleLogModal() {
    if (this.state.logModalOpen === true) {
      this.setState({ logModalOpen: false });
      this.setState({ episodeToDelete: null });
    } else {
      this.setState({ logModalOpen: true });
    }
  }

  episodeToLog() {
    const episodeId = event.target.parentElement.getAttribute('id');
    fetch('https://api.tvmaze.com/episodes/' + episodeId + '?embed=show')
      .then(response => response.json())
      .then(result => {
        this.setState({ episode: result });
      });
  }
}

export default Watchlist;
