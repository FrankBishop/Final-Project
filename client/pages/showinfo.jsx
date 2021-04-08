import React from 'react';

class ShowInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showName: this.props.show };
    // this.ShowDetails = this.ShowDetails.bind(this);
  }

  render() {
    // this.ShowDetails();
    // if (this.state.showName !== null) {
    return <div>
      <h1>{this.state.showName.name}</h1>
    </div>
    // } else {
    //   return <h1>No Show Selected</h1>
    // }
  }

  // ShowDetails() {
  //   fetch('http://api.tvmaze.com/shows/' + this.props.show + '?embed[]=episodes&embed[]=cast')
  //     .then(response => response.json())
  //     .then(result => this.setState({ showName: result }));
  // }
}

export default ShowInfo;
