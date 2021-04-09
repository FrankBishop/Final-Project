import React from 'react';
import EpisodeDetails from './episode-details';

class EpisodeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episode: null };
    this.EpisodeInfo = this.EpisodeInfo.bind(this);
    this.AddToWatchlist = this.AddToWatchlist.bind(this);
  }

  render() {
    if (this.state.episode !== null) {
      return < EpisodeDetails episode={this.state.episode} watchlist={this.props.watchlist} />;
    } else {
      const filteredEpisodes = this.props.show.filter(episode => episode.image !== null);
      const listResults = filteredEpisodes.map(episode =>
        <div className="episodes-list" key={episode.id} id={episode.id}>
          <img src={episode.image.medium} alt={episode.image.name} />
          <ul className="episode-title" value={episode.name} onClick={this.EpisodeInfo}>S{episode.season}E{episode.number} {episode.name}</ul>
          <ul className="episode-date" value={episode.airdate}> {episode.airdate} </ul>
          <div className="list-button-container">
            <button>Log</button>
            <button id={episode.id} onClick={this.AddToWatchlist}>Need to Watch</button>
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
    fetch('http://api.tvmaze.com/episodes/' + episodeId + '?embed=show')
      .then(response => response.json())
      .then(result => {
        this.setState({ episode: result });
      });
  }

  AddToWatchlist(event) {
    const episodeId = event.target.getAttribute('id');
    this.props.watchlist.push(episodeId);
  }

}

export default EpisodeList;
