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
    </form>;
  }

  handleChange(event) {
    console.log('value', this.state.value)
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ searching: true });
    event.preventDefault();
    console.log('state2', this.state);
    //do fetch here, when I get results, call this.props.onSubmit(with data passed in)
    fetch('http://api.tvmaze.com/search/shows?q=' + this.state.value + '')
      .then(response => response.json())
      .then(results => this.props.onSubmit(results));
  }

}

export default SearchForm;

// componentDidMount() {
//   fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(users => this.setState({ isLoading: false, users: users }));
// }
