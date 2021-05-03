import React from 'react';

class NetworkError extends React.Component {

  constructor(props) {
    super(props);
    this.close - this.close.bind(this);
  }

  render() {
    return <div className="modal-container">
      <div className="delete-modal">
        <h3 className="network-error-header">There was a network error, please try again</h3>
        <div className="network-error-buttons">
          <button onClick={this.close}>Close</button>
        </div>
      </div>
    </div>;
  }

  close() {
    t
  }

}

export default NetworkError;
