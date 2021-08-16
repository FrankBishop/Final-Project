import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', searchType: 'show' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeShow = this.changeShow.bind(this);
    this.changeActor = this.changeActor.bind(this);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <label htmlFor="search"> Search
        <input className="search-bar" name="search" type="search" value={this.state.value} onChange={this.handleChange} ></input>
      </label>
      <button disabled={this.props.calling === true} className="search-button" type="submit" searchType="show" onClick={this.changeShow}>Search Shows</button>
      <button disabled={this.props.calling === true} className="search-button" type="submit" searchType="actor" onClick={this.changeActor}>Search Actors</button>
      {this.props.calling === true &&
        <div className="loading-spinner"></div>
      }
    </form>;
  }

  changeShow() {
    this.setState({ searchType: 'show' });
  }

  changeActor() {
    this.setState({ searchType: 'actor' });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.props.calling === false) {
      this.props.toggleCalling();
    }
    event.preventDefault();
    if (this.state.searchType === 'show') {
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
    } else {
      fetch('https://api.tvmaze.com/search/people?q=' + this.state.value + '')
        .then(response => response.json())
        .then(results => {
          this.props.toggleCalling();
          if (results.length === 0) {
            this.props.noResults();
          }
          this.props.actorSearch(results);
        })
        .catch(err => {
          this.props.networkError();
          console.error(err);
        });
    }
  }

}

export default SearchForm;
