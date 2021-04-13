import React from 'react';
import AppDrawer from '../app-drawer.jsx';
import SearchForm from './search';

class Watchlist extends React.Component {

  render() {
    const watchlistEntries = this.props.watchlist;
    const watchlistToRender = watchlistEntries.map(episode =>
      <div className="watchlist-result" key={episode.entryId} id={episode.entryId} >
        <div className="watchlist-image-holder">
          <img className="episodes-list-image" src={episode.image} alt={episode['episode name']} ></img>
        </div>
        <div className="watchlist-episode-info">
            <ul className="watch-show-title" value={episode.show} > {episode.show}  </ul>
            <ul className="watch-episode-title" value={episode['episode name']} > S{episode.season}E{episode.number} {episode['episode name']} </ul>
          <div className="watchlist-button-container">
            <button className="watchlist-log-button">Log</button>
            <button className="watchlist-delete-button">Delete</button>
          </div>
        </div>
      </div>
    );
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
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            <ul className="list-results"> {watchlistToRender} </ul>
          </div>;
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
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            <ul className="list-results"> {watchlistToRender} </ul>
          </div>;
        </main>
        <footer>

        </footer>
      </div >;
    }
  }
}

export default Watchlist;
