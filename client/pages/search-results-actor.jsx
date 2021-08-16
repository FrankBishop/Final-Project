import React from 'react';
import SearchForm from './search';
import NetworkError from './network-error';

class SearchResultsActor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { actor: null, searching: false };
    this.actorInfo = this.actorInfo.bind(this);
  }

  // render() {
  //   const results = this.props.results;
  //   const filteredResults = results.filter(result => result.show.image != null);
  //   const listResults = filteredResults.map(result =>
  //     <div className="search-result" key={result.show.id} id={result.show.id}>
  //       <img className="search-image" src={result.show.image.medium} alt={result.show.name} ></img>
  //       <a className="show" onClick={this.showInfo} value={result.show.name}> {result.show.name} </a>
  //     </div>
  //   );
  //   return <div>
  //     <header>
  //       <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
  //       <a className="header-text site-header" onClick={this.props.goHome}> {this.props.text} </a>
  //       <div className="search-form-header">
  //         <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
  //       </div>
  //     </header>
  //     <main onClick={this.props.closeMenu}>
  //       <div className="search-form">
  //         <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
  //       </div>
  //       {this.state.searching === true &&
  //         <div className="loading-spinner"></div>
  //       }
  //       {this.props.networkErrorState === true &&
  //         <NetworkError tryAgain={this.props.tryAgain} toggleCalling={this.props.toggleCalling} />
  //       }
  //       <h1 className="main-header header-text">Search Results</h1>
  //       {this.props.results.length === 0 &&
  //         <h2 className="main-header header-text"> There are no results for this search</h2>
  //       }
  //       <ul className="list-results"> {listResults} </ul>
  //     </main>
  //     <footer onClick={this.props.closeMenu}>

  //     </footer>
  //   </div>;
  // }

  // actorInfo(event) {
  //   if (this.props.calling === false) {
  //     this.props.toggleCalling();
  //   }
  //   this.setState({ searching: true });
  //   const showId = event.target.parentElement.getAttribute('id');
  //   fetch('https://api.tvmaze.com/shows/' + showId + '?embed[]=episodes&embed[]=cast')
  //     .then(response => response.json())
  //     .then(result => {
  //       this.props.toggleCalling();
  //       this.props.setShow(result);
  //       this.setState({ searching: false });
  //     })
  //     .catch(err => {
  //       this.props.networkError();
  //       this.setState({ searching: false });
  //       console.error(err);
  //     });
  // }
}

export default SearchResultsActor;
