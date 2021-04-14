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
        <h1>Delete Modal</h1>
        <button onClick={this.deleteFromWatchlist}>Yes</button>
        <button onClick={this.closeModal}>No</button>
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
