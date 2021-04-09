import React from 'react';

class EpisodeDetails extends React.Component {

  render() {
    const summary = this.props.episode.summary;
    const filteredSummary = summary.replace(/<[^>]+>/g, '');
    return <div className="episode-info">
      <h1 className="show-header">{this.props.episode._embedded.show.name}</h1>
      <h2>S{this.props.episode.season}E{this.props.episode.number}</h2>
      <h2>{this.props.episode.name}</h2>
      <img src={this.props.episode.image.medium} alt="episode" />
      <div className="episode-summary">
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
