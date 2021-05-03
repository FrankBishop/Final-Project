import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', searching: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input className="search-bar" type="search" value={this.state.value} onChange={this.handleChange} ></input>
      <button className="search-button" type="submit">Search</button>
      {this.state.searching === true &&
        <div className="loading-spinner"></div>
      }
    </form>;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ searching: true });
    event.preventDefault();
    fetch('https://api.tvmaze.com/search/shows?q=' + this.state.value + '')
      .then(response => response.json())
      .then(results => {
        if (results.length === 0) {
          this.setState({ searching: false });
        }
        this.props.onSubmit(results);
      });
  }

}

export default SearchForm;
