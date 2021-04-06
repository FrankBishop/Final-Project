import React from 'react';
import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.SetSearchResults = this.SetSearchResults.bind(this);
  }

  SetSearchResults(results) {
    this.setState({ searchResults: results });
  }

  // handleChange(event) {
  //   console.log('change');
  //   console.log('value', this.state.value)
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(event) {
  //   console.log('submit')
  //   this.setState({ searching: true });
  //   event.preventDefault();
  //   // console.log('state2', this.state);
  //   // let test = thing => console.log('arrow', this.state.value);
  //   // test();
  // }

  render() {
    return <Home text="TV Diary" SetSearchResults= { this.SetSearchResults } searchResults = { this.state.searchResults }/>;
  }
}
