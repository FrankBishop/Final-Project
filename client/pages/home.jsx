import React from 'react';
import SearchForm from './search';
import NetworkError from './network-error';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: null, searching: false };
    this.showInfo = this.showInfo.bind(this);
  }

  render() {
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <a className="header-text site-header" onClick={this.props.goHome}> {this.props.text} </a>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
      </header>
      <main onClick={this.props.closeMenu}>
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
        <h1 className="main-header header-text">Popular Shows</h1>
        {this.props.networkErrorState === true &&
          <NetworkError tryAgain={this.props.tryAgain} toggleCalling={this.props.toggleCalling} />
        }
        <div className="image-holder-row">
          <img src="/images/683813.jpg" alt="The Mandalorian" id={38963} onClick={this.showInfo} />
          <img src="/images/746929.jpg" alt="Superman and Lois" id={44751} onClick={this.showInfo} />
        </div>
        <div className="image-holder-row">
          <img src="/images/739854.jpg" alt="The Falcon and The Winter Soldier" id={41749} onClick={this.showInfo} />
          <img src="/images/679902.jpg" alt="The Simpsons" id={83} onClick={this.showInfo} />
        </div>
      </main>
      <footer onClick={this.props.closeMenu}>

      </footer>
    </div>;
  }

  showInfo(event) {
    if (this.props.calling === false) {
      this.props.toggleCalling();
    }
    this.setState({ searching: true });
    const showId = event.target.getAttribute('id');
    fetch('https://api.tvmaze.com/shows/' + showId + '?embed[]=episodes&embed[]=cast')
      .then(response => response.json())
      .then(result => {
        this.props.toggleCalling();
        this.props.setShow(result);
      })
      .catch(err => {
        this.props.networkError();
        this.setState({ searching: false });
        console.error(err);
      });
  }
}
