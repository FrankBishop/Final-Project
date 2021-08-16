import React from 'react';
import LogModal from './log-modal';
import SearchForm from './search';
import NetworkError from './network-error';
import LoginModal from './login-request';

class EpisodeDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = { logModalOpen: false, userLoggedIn: true };
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.userLogonToggle = this.userLogonToggle.bind(this);
  }

  render() {
    const summary = this.props.showEpisode.summary;
    const filteredSummary = summary.replace(/<[^>]+>/g, '');
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <a className="header-text site-header" onClick={this.props.goHome}> TV Diary </a>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} noActorResults={this.props.noActorResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
      </header>
      <main onClick={this.props.closeMenu}>
        {this.props.calling === true &&
          <div className="loading-spinner"></div>
        }
        {this.props.networkErrorState === true &&
          <NetworkError tryAgain={this.props.tryAgain} toggleCalling={this.props.toggleCalling} />
        }
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} noActorResults={this.props.noActorResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
        <div className="episode-info">
          {this.state.logModalOpen === true &&
            <LogModal toggleModal={this.toggleModal} showName={this.props.showEpisode._embedded.show.name} season={this.props.showEpisode.season}
              number={this.props.showEpisode.number} name={this.props.showEpisode.name} saveToLog={this.props.saveToLog} image={this.props.showEpisode.image.original}
              userId={this.props.user} />
          }
          {this.state.userLoggedIn === false &&
            <LoginModal tryAgain={this.props.tryAgain} toggle={this.userLogonToggle} />
          }
          <h1 className="episode-header">{this.props.showEpisode._embedded.show.name}</h1>
          <h3 className="episode-details">S{this.props.showEpisode.season} E{this.props.showEpisode.number} {this.props.showEpisode.name}</h3>
          <h4 className="episode-details">{this.props.showEpisode.airdate}</h4>
          <div className="episode-image-holder summary">
            <img src={this.props.showEpisode.image.original} alt="episode" />
            <p>{filteredSummary}</p>
          </div>
          <div className="episode-button-container">
            <button onClick={this.openModal} disabled={this.props.calling === true} type="button">Log</button>
            <button onClick={this.addToWatchlist} disabled={this.props.calling === true} type="submit">Need To Watch</button>
          </div>
        </div>
      </main>
      <footer onClick={this.props.closeMenu}>

      </footer>
    </div>;
  }

  addToWatchlist(event) {
    if (this.props.user === null) {
      this.setState({ userLoggedIn: false });
      return;
    }
    const show = this.props.showEpisode._embedded.show.name;
    const episodeName = this.props.showEpisode.name;
    const season = this.props.showEpisode.season;
    const number = this.props.showEpisode.number;
    const image = this.props.showEpisode.image.original;
    const episode = {
      show: show,
      episodeName: episodeName,
      season: season,
      number: number,
      image: image
    };
    this.props.addToWatchlist(episode);
  }

  userLogonToggle() {
    this.setState({ userLoggedIn: true });
  }

  openModal() {
    if (this.props.user === null) {
      this.setState({ userLoggedIn: false });
      return;
    }
    this.setState({ logModalOpen: true });
  }

  toggleModal() {
    if (this.state.logModalOpen === true) {
      this.setState({ logModalOpen: false });
    } else {
      this.setState({ logModalOpen: true });
    }
  }
}

export default EpisodeDetails;
