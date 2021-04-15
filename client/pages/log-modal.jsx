import React from 'react';
import StarRatings from './star';

class LogModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { modalOpen: true };
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
            <StarRatings />
          </div>
          <div className="log-modal-buttons">
            <button>Save To Log</button>
            <button onClick={this.props.toggleModal}>Cancel</button>
          </div>
        </div>
      </div >;
    }
  }
}

export default LogModal;
