import React from 'react';

class EpisodeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episodes: this.props.show };
  }

  render() {
    const filteredEpisodes = this.state.episodes.filter(episode => episode.image !== null);
    const listResults = filteredEpisodes.map(episode =>
      <div className="episodes-list" key={episode.id}>
        <img src={episode.image.medium} alt={episode.image.name} />
        <ul className="episode-title" value={episode.name}>S{episode.season}E{episode.number} {episode.name}</ul>
        <ul className="episode-date" value={episode.airdate}> {episode.airdate} </ul>
        <div className="list-button-container">
          <button>Log</button>
          <button>Need to Watch</button>
        </div>
      </div>
    );
    return <div className="Episode List">
      <h1 className="episodes-list-header">Episode List</h1>
      <ul className="list-results"> {listResults} </ul>
    </div>;
  }
}

export default EpisodeList;
