import React from 'react';
import SearchForm from './search';
import SearchResults from './search-results';
import AppDrawer from '../app-drawer.jsx';

export default class Home extends React.Component {

  render() {
    if (this.props.searchResults.length > 0) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          {/* <div>
            <AppDrawer />
          </div> */}
          <h1 className="header-text"> {this.props.text} </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
        </header>
        <main>
          <div className="search-form">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
          <SearchResults results={this.props.searchResults} show={this.props.ShowInfo} watchlist={this.props.watchlist} AddToWatchlist={this.props.AddToWatchlist}
            menu={this.props.menu} menuOpen={this.props.menuOpen} />
        </main>
        <footer>

        </footer>
      </div>;
    } else if (this.props.menuOpen === true) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> {this.props.text} </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>;
          </header>
        <div>
          <AppDrawer menu={this.props.menu} menuOpen={this.props.menuOpen} />
        </div>
      </div>;
    } else {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> {this.props.text} </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
        </header>
        <main>
          <div className="search-form">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
          <h1 className="main-header header-text">Popular Shows</h1>
          <div className="image-holder-row">
            <img src="/images/683813.jpg" alt="The Mandalorian" />
            <img src="/images/746929.jpg" alt="Superman and Lois" />
          </div>
          <div className="image-holder-row">
            <img src="/images/739854.jpg" alt="The Falcon and The Winter Soldier" />
            <img src="/images/679902.jpg" alt="The Simpsons" />
          </div>
        </main>
        <footer>

        </footer>
      </div>;
    }
  }
}
