import React from 'react';
import ReactStars from 'react-stars';

class LogModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { modalOpen: true, rating: null };
    this.ratingChanged = this.ratingChanged.bind(this);
  }

  render() {
    if (this.state.modalOpen === false) {
      return <div className="hidden">
      </div>;
    } else {
      return <div className="modal-container">
        <div className="delete-modal">
          <h2>How do you rate this episode?</h2>
          <div className="star-container">
            {/* <StarRatings onChange={this.ratingChanged}/> */}
            <ReactStars count={5} onChange={this.ratingChanged} size={60} color2={'#ffd700'} value={this.state.rating} />
          </div>
          <div className="log-modal-buttons">
            <button>Save To Log</button>
            <button onClick={this.props.toggleModal}>Cancel</button>
          </div>
        </div>
      </div >;
    }
  }

  ratingChanged(newRating) {
    this.setState({ rating: newRating });
  }
}

export default LogModal;
