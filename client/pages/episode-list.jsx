import React from 'react';
import EpisodeDetails from './episode-details';

class EpisodeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episode: null };
    this.EpisodeInfo = this.EpisodeInfo.bind(this);
  }

  render() {
    if (this.state.episode !== null) {
      return < EpisodeDetails episode={this.state.episode} />;
    } else {
      const filteredEpisodes = this.props.show.filter(episode => episode.image !== null);
      const listResults = filteredEpisodes.map(episode =>
        <div className="episodes-list" key={episode.id} id={episode.id}>
          <img src={episode.image.medium} alt={episode.image.name} />
          <ul className="episode-title" value={episode.name} onClick={this.EpisodeInfo}>S{episode.season}E{episode.number} {episode.name}</ul>
          <ul className="episode-date" value={episode.airdate}> {episode.airdate} </ul>
          <div className="list-button-container">
            <button>Log</button>
            <button>Need to Watch</button>
          </div>
        </div>
      );
      return <div>
        <h1 className="episodes-list-header">Episode List</h1>
        <ul className="list-results"> {listResults} </ul>
      </div>;
    }
  }

  EpisodeInfo(event) {
    const episodeId = event.target.parentElement.getAttribute('id');
    fetch('http://api.tvmaze.com/episodes/' + episodeId + '')
      .then(response => response.json())
      .then(result => {
        this.setState({ episode: result });
      });
  }

}

export default EpisodeList;
