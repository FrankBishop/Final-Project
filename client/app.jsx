import React from 'react';
import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
    this.SetSearchResults = this.SetSearchResults.bind(this);
  }

  SetSearchResults(results) {
    this.setState({ searchResults: results });
  }

  render() {
    return <Home text="TV Diary" SetSearchResults= { this.SetSearchResults } searchResults = { this.state.searchResults }/>;
  }
}
