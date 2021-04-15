import React from 'react';
import SearchForm from './search';
import DeleteModal from './delete-modal';
import LogModal from './log-modal';

class Watchlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openModal: false, episodeToDelete: null, logModalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openLogModal = this.openLogModal.bind(this);
    this.toggleLogModal = this.toggleLogModal.bind(this);
  }

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
            <button className="watchlist-log-button" onClick={this.openLogModal}>Log</button>
            <button onClick={this.openModal} id={episode.entryId} className="watchlist-delete-button">Delete</button>
          </div>
        </div>
      </div>
    );
    if (this.props.watchlist.length === 0) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> TV Diary </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
        </header>
        <main>
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            <h2 className="main-header header-text"> Your Watchlist is Empty</h2>
          </div>;
        </main>
        <footer>

        </footer>
      </div>;
    } else if (this.state.openModal === true) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> TV Diary </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
        </header>
        <main>
          <DeleteModal episodeToDelete={this.state.episodeToDelete} deleteFromWatchlist={this.props.deleteFromWatchlist} openModal={this.props.openModal}
            toggleModal={this.toggleModal} />
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            <ul className="list-results"> {watchlistToRender} </ul>
          </div>;
        </main>
        <footer>

        </footer>
      </div>;
    } else if (this.state.logModalOpen === true) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text"> TV Diary </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.SetSearchResults} />
          </div>
        </header>
        <main>
          <LogModal toggleModal = {this.toggleLogModal} />
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            <ul className="list-results"> {watchlistToRender} </ul>
          </div>;
        </main>
        <footer>

        </footer>
      </div>;
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
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
          <div>
            <h1 className="main-header header-text">Watchlist</h1>
            <ul className="list-results"> {watchlistToRender} </ul>
          </div>;
        </main>
        <footer>

        </footer>
      </div>;
    }
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

  openLogModal() {
    this.setState({ logModalOpen: true });
  }

  toggleLogModal() {
    if (this.state.logModalOpen === true) {
      this.setState({ logModalOpen: false });
      this.setState({ episodeToDelete: null });
    } else {
      this.setState({ logModalOpen: true });
    }
  }
}

export default Watchlist;
