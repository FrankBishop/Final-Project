import React from 'react';

class DeleteModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episodeToDelete: false, modalOpen: this.props.openModal };
    this.deleteFromWatchlist = this.deleteFromWatchlist.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    if (this.props.openModal === false) {
      return <div className="hidden">
        <h1>Delete Modal</h1>
      </div>;
    } else {
      return <div className="delete-modal">
        <h2>Are you sure you want to delete this episode from your watchlist?</h2>
        <div className="delete-modal-buttons">
          <button onClick={this.deleteFromWatchlist} id={this.props.episodeToDelete} >Yes</button>
          <button onClick={this.closeModal}>No</button>
        </div>
      </div>;
    }
  }

  deleteFromWatchlist(event) {
    this.setState({ modalOpen: false });
    this.setState({ episodeToDelete: true });
    const deleteId = event.target.getAttribute('id');
    this.props.deleteFromWatchlist(deleteId);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }
}

export default DeleteModal;
