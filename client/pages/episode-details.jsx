import React from 'react';

class EpisodeDetails extends React.Component {

  render() {
    return <div className="episode-info">
      <h1 className="show-header">{this.props.episode._embedded.show.name}</h1>
      <h2>S{this.props.episode.season}E{this.props.episode.number}</h2>
      <h2>{this.props.episode.name}</h2>
      <img src= {this.props.episode.image.medium} alt="episode"/>
      <div className="episode-summary">
        <p>{this.props.episode.summary}</p>
      </div>
      {/* <h1 className="show-header">{this.props.showName.name}</h1>
      <h4 className="premiere-date">Premiere Date - {this.state.showName.premiered}</h4>
      <button className="episodes-link" onClick={this.EpisodeListings}>Episode List</button>
      <img className="show-image" src={this.state.showName.image.medium} alt={this.state.showName.name} ></img>
      <h3 className="summary-header">Summary</h3>
      <div className="summary"> {filteredSummary}</div>
      <ul className="cast-list">{listResults}</ul> */}
    </div>;
  }
}

export default EpisodeDetails;
