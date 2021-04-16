import React from 'react';
import SearchForm from './search';
import ReactStars from 'react-stars';

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
          <ReactStars className="stars-mobile" count={5} size={25} color2={'#ffd700'} value={Number(episode.rating)} edit={false} />
          <ReactStars className="stars-desktop" count={5} size={50} color2={'#ffd700'} value={Number(episode.rating)} edit={false} />
        </div>
      </div>
    );
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <h1 className="header-text"> TV Diary </h1>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} />
        </div>
      </header>
      <main>
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} />
        </div>
        <div>
          <h1 className="main-header header-text">Diary</h1>
          <ul className="list-results"> {diaryToRender} </ul>
        </div>;
        </main>
      <footer>

      </footer>
    </div>;
  }
}

export default Diary;
