import React from 'react';
import LogModal from './log-modal';
import SearchForm from './search';
import NetworkError from './network-error';

class EpisodeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episode: null, logModalOpen: false, episodeToLog: null, searching: false };
    this.episodeInfo = this.episodeInfo.bind(this);
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.openLogModal = this.openLogModal.bind(this);
    this.toggleLogModal = this.toggleLogModal.bind(this);
    this.episodeToLog = this.episodeToLog.bind(this);
  }

  render() {
    const filteredEpisodes = this.props.episodesList.filter(episode => episode.image !== null);
    const listResults = filteredEpisodes.map(episode =>
      <div className="episodes-list" key={episode.id} id={episode.id}>
        <img className="episodes-list-image" src={episode.image.medium} alt={episode.image.name} />
        <a className="episode-title" value={episode.name} onClick={this.episodeInfo}>S{episode.season}E{episode.number} {episode.name}</a>
        <ul className="episode-date" value={episode.airdate}> {episode.airdate} </ul>
        <div className="list-button-container">
          <button onClick={this.openLogModal} show={this.props.showName} name={episode.name} season={episode.season} number={episode.number}
            image={episode.image.original} type="button">Log</button>
          <button show={this.props.showName} name={episode.name} season={episode.season} number={episode.number} image={episode.image.medium} onClick={this.addToWatchlist} type="submit">Need to Watch</button>
        </div>
      </div>
    );
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <a className="header-text site-header" onClick={this.props.goHome}> TV Diary </a>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
      </header>
      <main>
        {this.props.calling === true &&
          <div className="loading-spinner"></div>
        }
        {this.props.networkErrorState === true &&
          <NetworkError tryAgain={this.props.tryAgain} toggleCalling={this.props.toggleCalling} />
        }
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
        {this.state.logModalOpen === true &&
          <LogModal toggleModal={this.toggleLogModal} showName={this.state.episodeToLog.showName} season={this.state.episodeToLog.season}
            number={this.state.episodeToLog.number} name={this.state.episodeToLog.name} saveToLog={this.props.saveToLog} image={this.state.episodeToLog.image}
            userId={this.state.episodeToLog.userId} />
        }
        {this.state.searching === true &&
          <div className="loading-spinner"></div>
        }
        <h1 className="episodes-list-header header-text">Episode List</h1>
        {listResults.length === 0 &&
          <h2 className="main-header header-text"> There are no episodes to display</h2>
        }
        <ul className="list-results"> {listResults} </ul>
      </main>
      <footer>

      </footer>
    </div >;
  }

  episodeInfo(event) {
    this.setState({ searching: true });
    const episodeId = event.target.parentElement.getAttribute('id');
    fetch('https://api.tvmaze.com/episodes/' + episodeId + '?embed=show')
      .then(response => response.json())
      .then(result => {
        this.setState({ searching: false });
        this.props.showEpisode(result);
      })
      .catch(err => {
        this.props.networkError();
        this.props.toggleCalling();
        this.setState({ searching: false });
        console.error(err);
      });
  }

  addToWatchlist(event) {
    event.preventDefault();
    const show = event.target.getAttribute('show');
    const episodeName = event.target.getAttribute('name');
    const season = event.target.getAttribute('season');
    const number = event.target.getAttribute('number');
    const image = event.target.getAttribute('image');
    const episode = {
      show: show,
      episodeName: episodeName,
      season: season,
      number: number,
      image: image
    };
    this.props.addToWatchlist(episode);
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

export default EpisodeList;
