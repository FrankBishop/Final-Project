import React from 'react';

class ShowInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showName: this.props.show };
  }

  render() {
    const summary = this.state.showName.summary;
    const filteredSummary = summary.replace(/<[^>]+>/g, '');
    const cast = this.state.showName._embedded.cast;
    const filteredCast = cast.filter(result => result.person.image != null);
    const listResults = filteredCast.map(result =>
      <div className="cast-member" key={result.character.id}>
        <img className="cast-image" src={result.person.image.medium} alt={result.person.name} />
        <ul className="actor" value={result.person.name}> {result.person.name} </ul>
        <ul className="character" value={result.character.name}> {result.character.name} </ul>
      </div>
    );
    return <div className="show-info">
      <h1 className="show-header">{this.state.showName.name}</h1>
      <h4>Premiere Date - {this.state.showName.premiered}</h4>
      <button className="episodes-link">Episode List</button>
      <img className="show-image" src={this.state.showName.image.medium} alt={this.state.showName.name} ></img>
      <h4>Summary</h4>
      <div className="summary"> {filteredSummary}</div>
      <ul className="cast-list">{listResults}</ul>
    </div>;
  }

}

export default ShowInfo;
