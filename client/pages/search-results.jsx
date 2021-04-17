import React from 'react';
import SearchForm from './search';

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
        <h1 className="main-header header-text">Search Results</h1>
        <ul className="list-results"> {listResults} </ul>
      </main>
      <footer>

      </footer>
    </div>;
  }

  showInfo(event) {
    const showId = event.target.parentElement.getAttribute('id');
    fetch('https://api.tvmaze.com/shows/' + showId + '?embed[]=episodes&embed[]=cast')
      .then(response => response.json())
      .then(result => {
        this.props.setShow(result);
      });
  }
}

export default SearchResults;
