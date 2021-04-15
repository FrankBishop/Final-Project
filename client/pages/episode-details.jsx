import React from 'react';
import LogModal from './log-modal'

class EpisodeDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = { logModalOpen: false }
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  render() {
    const summary = this.props.episode.summary;
    const filteredSummary = summary.replace(/<[^>]+>/g, '');
    if (this.state.logModalOpen === false) {
      return <div className="episode-info">
        <h1 className="episode-header">{this.props.episode._embedded.show.name}</h1>
        <h3 className="episode-details">S{this.props.episode.season} E{this.props.episode.number} {this.props.episode.name}</h3>
        <h4 className="episode-details">{this.props.episode.airdate}</h4>
        <div className="episode-image-holder summary">
          <img src={this.props.episode.image.original} alt="episode" />
          <p>{filteredSummary}</p>
        </div>
        <div className="episode-button-container">
          <button onClick={this.openModal}>Log</button>
          <button onClick={this.AddToWatchlist}>Need To Watch</button>
          <button>Mark as Watched</button>
        </div>
      </div>;
    } else {
      return <div className="episode-info">
        <LogModal toggleModal={this.toggleModal} showName={this.props.episode._embedded.show.name} season={this.props.episode.season}
          number={this.props.episode.number} name={this.props.episode.name} />
        <h1 className="episode-header">{this.props.episode._embedded.show.name}</h1>
        <h3 className="episode-details">S{this.props.episode.season} E{this.props.episode.number} {this.props.episode.name}</h3>
        <h4 className="episode-details">{this.props.episode.airdate}</h4>
        <div className="episode-image-holder summary">
          <img src={this.props.episode.image.original} alt="episode" />
          <p>{filteredSummary}</p>
        </div>
        <div className="episode-button-container">
          <button onClick={this.openModal}>Log</button>
          <button onClick={this.AddToWatchlist}>Need To Watch</button>
          <button>Mark as Watched</button>
        </div>
      </div>;
    }
  }

  addToWatchlist(event) {
    const show = this.props.episode._embedded.show.name;
    const episodeName = this.props.episode.name;
    const season = this.props.episode.season;
    const number = this.props.episode.number;
    const image = this.props.episode.image.original;
    const episode = {
      show: show,
      episodeName: episodeName,
      season: season,
      number: number,
      image: image
    };
    this.props.addToWatchlist(episode);
  }

  openModal() {
    console.log('opening works');
    this.setState({ logModalOpen: true });
  }

  toggleModal() {
    if (this.state.logModalOpen === true) {
      console.log('true')
      this.setState({ logModalOpen: false });
    } else {
      console.log('false')
      this.setState({ logModalOpen: true });
    }
  }
}

export default EpisodeDetails;
