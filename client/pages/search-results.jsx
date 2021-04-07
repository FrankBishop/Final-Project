import React from 'react';

class SearchResults extends React.Component {

  // constructor(props) {
  //   super(props);
  //   // this.state = { value: '', searching: false };
  // }

  render() {
    function ListItem(props) {
      return <ul>{props.value}</ul>;
    }
    const results = this.props.results;
    console.log(results);
    const listResults = results.map((result) =>
      <div key={result.show.id}>
        <img src={result.show.image.medium} ></img>
        <ListItem value={result.show.name} />
        <ListItem value={result.show.status} />
      </div>
    );
    return <ul> {listResults} </ul>
  }

}

export default SearchResults;
