import React from 'react';
import SearchForm from './search';
import ReactStars from 'react-stars';
import NetworkError from './network-error';

class Diary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openModal: false, episodeToDelete: null, logModalOpen: false, episodeToLog: null };
  }

  render() {
    const diaryEntries = this.props.log;
    const diaryToRender = diaryEntries.slice(0).reverse().map(episode =>
      <div className="watchlist-result" key={episode.logId} id={episode.logId} >
        <div className="watchlist-image-holder">
          <img className="episodes-list-image" src={episode.image} alt={episode['episode name']} ></img>
        </div>
        <div className="diary-episode-info">
          <ul className="watch-show-title" value={episode.show} > {episode.show}  </ul>
          <ul className="watch-episode-title" value={episode['episode name']} > S{episode.season}E{episode.number} {episode['episode name']} </ul>
        </div>
        <div className="diary-rating">
          <ul className="log-date"> {episode.date}  </ul>
          <ReactStars className="stars-mini" count={5} size={20} color2={'#ffd700'} value={Number(episode.rating)} edit={false} />
          <ReactStars className="stars-mobile" count={5} size={25} color2={'#ffd700'} value={Number(episode.rating)} edit={false} />
          <ReactStars className="stars-desktop" count={5} size={50} color2={'#ffd700'} value={Number(episode.rating)} edit={false} />
        </div>
      </div>
    );
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <a className="header-text site-header" onClick={this.props.goHome}> TV Diary </a>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
      </header>
      <main onClick={this.props.closeMenu}>
        {this.props.networkErrorState === true &&
          <NetworkError tryAgain={this.props.tryAgain} toggleCalling={this.props.toggleCalling} />
        }
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} actorSearch={this.props.actorSearch} noResults={this.props.noResults} networkError={this.props.networkError} calling={this.props.calling} toggleCalling={this.props.toggleCalling} />
        </div>
        <div>
          <h1 className="main-header header-text">Diary</h1>
          {this.props.user === null &&
              <h2 className="main-header header-text">Please sign in to access this feature</h2>
          }
          {this.props.log.length === 0 & this.props.user !== null &&
            <h2 className="main-header header-text"> Your Have No Diary Entries</h2>
          }
          <ul className="list-results"> {diaryToRender} </ul>
        </div>;
        </main>
      <footer onClick={this.props.closeMenu}>

      </footer>
    </div>;
  }
}

export default Diary;
