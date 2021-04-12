import React from 'react';
import AppDrawer from '../app-drawer.jsx';
import SearchForm from './search';

class Watchlist extends React.Component {

  render() {
    if (this.props.menuOpen === true) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> TV Diary </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
        </header>
        <div>
          <AppDrawer menu={this.props.menu} menuOpen={this.props.menuOpen} OpenWatchlist={this.props.OpenWatchlist} isWatchlistOpen={this.props.isWatchlistOpen}
            GoHome={this.props.GoHome} />
        </div>
        <main>
          <h1>This is the Watchlist</h1>
        </main>
        <footer>

        </footer>
      </div >;
    } else {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> TV Diary </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
        </header>
        <main>
          <h1>This is the Watchlist</h1>
        </main>
        <footer>

        </footer>
      </div >;
    }
  }
}

export default Watchlist;
