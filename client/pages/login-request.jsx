import React from 'react';

class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  render() {
    return <div className="modal-container">
      <div className="delete-modal">
        <h3 className="network-error-header">Please sign in to access this feature</h3>
        <div className="network-error-buttons">
          <button onClick={this.close}>Close</button>
        </div>
      </div>
    </div>;
  }

  close() {
    this.props.tryAgain();
    this.props.toggle();
  }

}

export default LoginModal;
