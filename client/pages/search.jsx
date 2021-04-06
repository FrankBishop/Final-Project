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
    </form>;
  }

  handleChange(event) {
    console.log('value', this.state.value)
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log('state', this.state);
    event.preventDefault();
  }
}

export default SearchForm;
