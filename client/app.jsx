import React from 'react';
import Home from './pages/home';
import ls from 'local-storage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], watchlist: [] };
    this.SetSearchResults = this.SetSearchResults.bind(this);
    this.ShowWatchlist = this.ShowWatchlist.bind(this);
  }

  componentDidMount() {
    this.setState({ watchlist: ls.get('watchlist') });
  }

  SetSearchResults(results) {
    this.setState({ searchResults: results });
  }

  ShowWatchlist(entries) {
    this.setState({ watchlist: entries });
  }

  render() {
    return <Home text="TV Diary" SetSearchResults= { this.SetSearchResults } searchResults = { this.state.searchResults } watchlist = {this.state.watchlist}/>;
  }
}
