import React from 'react';

class SearchResults extends React.Component {

  render() {
    function ListItem(props) {
      return <ul>{props.value}</ul>;
    }
    const results = this.props.results;
    console.log(results);
    const listResults = results.map((result) =>
      <div className="search-result" key={result.show.id}>
        <img src={result.show.image.medium} ></img>
        <ListItem value={result.show.name} />
        <ListItem value={result.show.premiered} />
      </div>
    );
    return <ul className="list-results"> {listResults} </ul>
  }

}

export default SearchResults;
