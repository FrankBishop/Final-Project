import React from 'react';

class ShowInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showName: this.props.show };
  }

  render() {
    console.log(this.state.showName)
    const cast = this.state.showName._embedded.cast;
    const filteredCast = cast.filter(result => result.person.image != null);
    const listResults = filteredCast.map(result =>
      <div className="cast-member" key={result.person.id}>
        <img className="cast-image" src={result.person.image.medium} alt={result.person.name} />
        <ul className="actor" value={result.person.name}> {result.person.name} </ul>
        <ul className="character" value={result.character.name}> {result.character.name} </ul>
      </div>
    );
    return <div>
      <h1 className="show-header">{this.state.showName.name}</h1>
      <h4>Premiere Date - {this.state.showName.premiered}</h4>
      <h4>View Episode List</h4>
      <img className="show-image" src={this.state.showName.image.medium} alt={this.state.showName.name} ></img>
      <h4>Summary</h4>
      <div className="summary">{this.state.showName.summary}</div>
      <ul className="cast-list">{listResults}</ul>
    </div>;
  }

}

export default ShowInfo;