import React from 'react';
import AppDrawer from '../app-drawer.jsx';

class EpisodeDetails extends React.Component {

  constructor(props) {
    super(props);
    this.AddToWatchlist = this.AddToWatchlist.bind(this);
  }

  render() {
    const summary = this.props.episode.summary;
    const filteredSummary = summary.replace(/<[^>]+>/g, '');
    if (this.props.menuOpen === true) {
      return <div>
        <div>
          <AppDrawer menu={this.props.menu} menuOpen={this.props.menuOpen} OpenWatchlist={this.props.OpenWatchlist} isWatchlistOpen={this.props.isWatchlistOpen}
            GoHome={this.props.GoHome} />
        </div>
        <h1 className="episode-header">{this.props.episode._embedded.show.name}</h1>
        <h3 className="episode-details">S{this.props.episode.season} E{this.props.episode.number} {this.props.episode.name}</h3>
        <h4 className="episode-details">{this.props.episode.airdate}</h4>
        <div className="episode-image-holder summary">
          <img src={this.props.episode.image.original} alt="episode" />
          <p>{filteredSummary}</p>
        </div>
        <div className="episode-button-container">
          <button>Log</button>
          <button onClick={this.AddToWatchlist}>Need To Watch</button>
          <button>Mark as Watched</button>
        </div>
      </div>;
    } else {
      return <div className="episode-info">
        <h1 className="episode-header">{this.props.episode._embedded.show.name}</h1>
        <h3 className="episode-details">S{this.props.episode.season} E{this.props.episode.number} {this.props.episode.name}</h3>
        <h4 className="episode-details">{this.props.episode.airdate}</h4>
        <div className="episode-image-holder summary">
          <img src={this.props.episode.image.original} alt="episode" />
          <p>{filteredSummary}</p>
        </div>
        <div className="episode-button-container">
          <button>Log</button>
          <button onClick={this.AddToWatchlist}>Need To Watch</button>
          <button>Mark as Watched</button>
        </div>
      </div>;
    }
  }

  AddToWatchlist(event) {
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
    this.props.AddToWatchlist(episode);
  }
}

export default EpisodeDetails;
