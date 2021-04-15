import React from 'react';
import ShowInfo from './showinfo';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: null };
    this.showInfo = this.showInfo.bind(this);
  }

  render() {
    const results = this.props.results;
    const filteredResults = results.filter(result => result.show.image != null);
    const listResults = filteredResults.map(result =>
      <div className="search-result" key={result.show.id} id={result.show.id}>
        <img className="search-image" src={result.show.image.medium} alt={result.show.name} ></img>
        <ul className="show" onClick={this.showInfo} value={result.show.name}> {result.show.name} </ul>
      </div>
    );
    if (this.state.show !== null) {
      return < ShowInfo show={this.state.show} watchlist={this.props.watchlist} addToWatchlist={this.props.addToWatchlist} menu={this.props.menu}
        menuOpen={this.props.menuOpen} openWatchlist={this.props.openWatchlist} isWatchlistOpen={this.props.isWatchlistOpen} goHome={this.props.goHome}/>;
    } else {
      return <div>
        <h1 className="main-header header-text">Search Results</h1>
        <ul className="list-results"> {listResults} </ul>
      </div>;
    }
  }

  showInfo(event) {
    const showId = event.target.parentElement.getAttribute('id');
    fetch('https://api.tvmaze.com/shows/' + showId + '?embed[]=episodes&embed[]=cast')
      .then(response => response.json())
      .then(result => {
        this.setState({ show: result });
      });
  }
}

export default SearchResults;
