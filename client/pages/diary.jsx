import React from 'react';
import SearchForm from './search';
import ReactStars from 'react-stars';

class Diary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openModal: false, episodeToDelete: null, logModalOpen: false, episodeToLog: null };
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openLogModal = this.openLogModal.bind(this);
    this.toggleLogModal = this.toggleLogModal.bind(this);
    this.episodeToLog = this.episodeToLog.bind(this);
  }

  render() {
    const diaryEntries = this.props.log;
    const diaryToRender = diaryEntries.map(episode =>
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
          <ReactStars className="stars-mobile" count={5} size={25} color2={'#ffd700'} value={episode.rating} edit={false} />
          <ReactStars className="stars-desktop" count={5} size={50} color2={'#ffd700'} value={episode.rating} edit={false} />
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

  openModal(event) {
    const deleteId = event.target.getAttribute('id');
    this.setState({ openModal: true });
    this.setState({ episodeToDelete: deleteId });
  }

  toggleModal() {
    if (this.state.openModal === true) {
      this.setState({ openModal: false });
      this.setState({ episodeToDelete: null });
    } else {
      this.setState({ openModal: true });
    }
  }

  openLogModal(event) {
    this.setState({ logModalOpen: true });
    const showName = event.target.getAttribute('show');
    const episodeName = event.target.getAttribute('name');
    const season = event.target.getAttribute('season');
    const number = event.target.getAttribute('number');
    const image = event.target.getAttribute('image');
    const episode = {
      showName: showName,
      season: season,
      number: number,
      name: episodeName,
      image: image
    };
    this.setState({ episodeToLog: episode });
  }

  toggleLogModal() {
    if (this.state.logModalOpen === true) {
      this.setState({ logModalOpen: false });
      this.setState({ episodeToDelete: null });
    } else {
      this.setState({ logModalOpen: true });
    }
  }

  episodeToLog() {
    const episodeId = event.target.parentElement.getAttribute('id');
    fetch('https://api.tvmaze.com/episodes/' + episodeId + '?embed=show')
      .then(response => response.json())
      .then(result => {
        this.setState({ episode: result });
      });
  }
}

export default Diary;
