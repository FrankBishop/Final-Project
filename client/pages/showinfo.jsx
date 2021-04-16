import React from 'react';
import EpisodeList from './episode-list';
import SearchForm from './search';

class ShowInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showName: this.props.show, episodes: null };
    this.episodeListings = this.episodeListings.bind(this);
  }

  render() {
    const summary = this.state.showName.summary;
    const filteredSummary = summary.replace(/<[^>]+>/g, '');
    const cast = this.state.showName._embedded.cast;
    const filteredCast = cast.filter(result => result.person.image != null);
    const listResults = filteredCast.map(result =>
      <div className="cast-member" key={result.character.id}>
        <img className="cast-image" src={result.person.image.medium} alt={result.person.name} />
        <ul className="actor" value={result.person.name}> {result.person.name} </ul>
        <ul className="character" value={result.character.name}> {result.character.name} </ul>
      </div>
    );
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> {this.props.text} </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
        </header>
        <main>
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
          <div className="show-info">
            <h1 className="show-header header-text">{this.state.showName.name}</h1>
            <h4 className="premiere-date">Premiere Date - {this.state.showName.premiered}</h4>
            <button className="episodes-link" onClick={this.episodeListings}>Episode List</button>
            <img className="show-image" src={this.state.showName.image.medium} alt={this.state.showName.name} ></img>
            <h3 className="summary-header">Summary</h3>
            <div className="summary"> {filteredSummary}</div>
            <ul className="cast-list">{listResults}</ul>
          </div>
        </main>
        <footer>

        </footer>
      </div>;
    }
  

  episodeListings() {
    fetch('https://api.tvmaze.com/shows/' + this.state.showName.id + '/episodes')
      .then(response => response.json())
      .then(result => {
        this.props.episodes(result);
      });
  }
}

export default ShowInfo;
