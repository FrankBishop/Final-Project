import React from 'react';
import ReactStars from 'react-stars';

class LogModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { modalOpen: true, rating: null };
    this.ratingChanged = this.ratingChanged.bind(this);
    this.saveToLog = this.saveToLog.bind(this);
  }

  render() {
    if (this.state.modalOpen === false) {
      return <div className="hidden">
      </div>;
    } else {
      return <div className="modal-container">
        {/* <form> */}
          <div className="delete-modal">
            <h2>How do you rate this episode?</h2>
            <div className="star-container">
              <ReactStars className="stars-mobile" count={5} onChange={this.ratingChanged} size={60} color2={'#ffd700'} value={this.state.rating} />
            </div>
            <div className="log-modal-buttons">
              <button onClick={this.saveToLog}>Save To Log</button>
              <button onClick={this.props.toggleModal} type="button">Cancel</button>
            </div>
          </div>
        {/* </form> */}
      </div >;
    }
  }

  ratingChanged(newRating) {
    this.setState({ rating: newRating });
  }

  saveToLog(event) {
    const log = {
      date: new Date().toLocaleDateString(),
      showName: this.props.showName,
      season: this.props.season,
      number: this.props.number,
      episodeName: this.props.name,
      rating: this.state.rating,
      image: this.props.image
    };
    this.props.toggleModal();
    this.props.saveToLog(log);
  }
}

export default LogModal;
