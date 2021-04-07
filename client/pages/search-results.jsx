import React from 'react';

class SearchResults extends React.Component {

  render() {
    function ListItem(props) {
      return <ul>{props.value}</ul>;
    }
    const results = this.props.results;
    const filteredResults = results.filter(result => result.show.image != null);
    const listResults = filteredResults.map((result) =>
      <div className="search-result" key={result.show.id}>
        <img src={result.show.image.medium} alt={result.show.name} ></img>
        <ListItem value={result.show.name} />
        <ListItem value={result.show.premiered} />
      </div>
    );
    return <ul className="list-results"> {listResults} </ul>;
  }
}

export default SearchResults;
