import React from 'react';
import ShowInfo from './showinfo';
import SearchForm from './search';
import AppDrawer from '../app-drawer.jsx';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: null };
    this.ShowInfo = this.ShowInfo.bind(this);
  }

  render() {
    if (this.state.show !== null) {
      return < ShowInfo show={this.state.show} watchlist={this.props.watchlist} AddToWatchlist={this.props.AddToWatchlist} menu={this.props.menu} menuOpen={this.props.menuOpen} />;
    } else if (this.props.menuOpen === true) {
      const results = this.props.results;
      const filteredResults = results.filter(result => result.show.image != null);
      const listResults = filteredResults.map(result =>
        <div className="search-result" key={result.show.id} id={result.show.id}>
          <img src={result.show.image.medium} alt={result.show.name} ></img>
          <ul className="show" onClick={this.ShowInfo} value={result.show.name}> {result.show.name} </ul>
        </div>
      );
      return <div>
        <div>
          <AppDrawer menu={this.props.menu} menuOpen={this.props.menuOpen} />
        </div>
        <div>
          <h1 className="main-header header-text">Search Results</h1>
          <ul className="list-results"> {listResults} </ul>
        </div>;
      </div>;
    } else {
      const results = this.props.results;
      const filteredResults = results.filter(result => result.show.image != null);
      const listResults = filteredResults.map(result =>
        <div className="search-result" key={result.show.id} id={result.show.id}>
          <img src={result.show.image.medium} alt={result.show.name} ></img>
          <ul className="show" onClick={this.ShowInfo} value={result.show.name}> {result.show.name} </ul>
        </div>
      );
      return <div>
        <h1 className="main-header header-text">Search Results</h1>
        <ul className="list-results"> {listResults} </ul>
      </div>;
    }
  }

  ShowInfo(event) {
    const showId = event.target.parentElement.getAttribute('id');
    fetch('http://api.tvmaze.com/shows/' + showId + '?embed[]=episodes&embed[]=cast')
      .then(response => response.json())
      .then(result => {
        this.setState({ show: result });
      });
  }
}

export default SearchResults;
