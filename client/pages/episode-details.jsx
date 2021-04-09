import React from 'react';

class EpisodeDetails extends React.Component {

  render() {
    const summary = this.props.episode.summary;
    const filteredSummary = summary.replace(/<[^>]+>/g, '');
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
        <button>Need To Watch</button>
        <button>Mark as Watched</button>
      </div>
    </div>;
  }
}

export default EpisodeDetails;
