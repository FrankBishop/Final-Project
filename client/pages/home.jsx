import React from 'react';
import SearchForm from './search';
import NetworkError from './network-error';

export default class Home extends React.Component {

  render() {
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <a className="header-text site-header" onClick={this.props.goHome}> {this.props.text} </a>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} noResults={this.props.noResults} networkError = {this.props.networkError} />
        </div>
      </header>
      <main>
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} noResults={this.props.noResults} networkError={this.props.networkError}/>
        </div>
        {/* <div class="loading-spinner"></div> */}
        <h1 className="main-header header-text">Popular Shows</h1>
        { this.props.networkErrorState === true &&
          <NetworkError/>
        }
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
