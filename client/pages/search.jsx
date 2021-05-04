import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input className="search-bar" type="search" value={this.state.value} onChange={this.handleChange} ></input>
      <button className="search-button" type="submit">Search</button>
      {this.props.calling === true &&
        <div className="loading-spinner"></div>
      }
    </form>;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.props.calling === false) {
      this.props.toggleCalling();
    }
    event.preventDefault();
    fetch('https://api.tvmaze.com/search/shows?q=' + this.state.value + '')
      .then(response => response.json())
      .then(results => {
        this.props.toggleCalling();
        if (results.length === 0) {
          this.props.noResults();
        }
        this.props.onSubmit(results);
      })
      .catch(err => {
        this.props.networkError();
        console.error(err);
      });
  }

}

export default SearchForm;
