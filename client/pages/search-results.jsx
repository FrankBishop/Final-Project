import React from 'react';
import ShowInfo from './showinfo';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: null };
    this.ShowInfo = this.ShowInfo.bind(this);
  }

  render() {
    if (this.state.show !== null) {
      return < ShowInfo show={this.state.show} />;
    } else {
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
  }

  ShowInfo(event) {
    console.log('it clicks a show');
    console.log(event.target.parentElement);
    let showId = event.target.parentElement.getAttribute('id');
    console.log('showId', showId);
    fetch('http://api.tvmaze.com/shows/' + showId + '?embed[]=episodes&embed[]=cast')
      .then(response => response.json())
      .then(result => {
        this.setState({ show: result });
      });
  }
}

export default SearchResults;
