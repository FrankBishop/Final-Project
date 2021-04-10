import React from 'react';
import EpisodeDetails from './episode-details';
// import ls from 'local-storage';

class EpisodeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episode: null };
    this.EpisodeInfo = this.EpisodeInfo.bind(this);
    this.AddToWatchlist = this.AddToWatchlist.bind(this);
  }

  render() {
    if (this.state.episode !== null) {
      return < EpisodeDetails episode={this.state.episode} watchlist={this.props.watchlist} AddToWatchlist={this.props.AddToWatchlist}/>;
    } else {
      const filteredEpisodes = this.props.show.filter(episode => episode.image !== null);
      const listResults = filteredEpisodes.map(episode =>
        <div className="episodes-list" key={episode.id} id={episode.id}>
          <img src={episode.image.medium} alt={episode.image.name} />
          <ul className="episode-title" value={episode.name} onClick={this.EpisodeInfo}>S{episode.season}E{episode.number} {episode.name}</ul>
          <ul className="episode-date" value={episode.airdate}> {episode.airdate} </ul>
          <div className="list-button-container">
            <button>Log</button>
            <button show={this.props.show.name} name={episode.name} season={episode.season} number={episode.number} image={episode.image.medium} onClick={this.AddToWatchlist}>Need to Watch</button>
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
    event.preventDefault();
    const show = this.props.showName;
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
    this.setState({ episode: episode });
    // ls.set('watchlist', this.props.watchlist);
  }

}

export default EpisodeList;
