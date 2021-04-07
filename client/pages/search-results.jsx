import React from 'react';

class SearchResults extends React.Component {

  render() {
    const results = this.props.results;
    const filteredResults = results.filter(result => result.show.image != null);
    const listResults = filteredResults.map(result =>
      <div className="search-result" key={result.show.id} id={result.show.id}>
        <img src={result.show.image.medium} alt={result.show.name} ></img>
        <ul onClick={this.ShowInfo} value={result.show.name}> {result.show.name} </ul>
      </div>
    );
    return <ul className="list-results"> {listResults} </ul>;
  }

  ShowInfo(event) {
    console.log('it clicks a show');
    console.log(event.target);
  }
}

export default SearchResults;
