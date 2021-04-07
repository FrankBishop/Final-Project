import React from 'react';

class SearchResults extends React.Component {

  // constructor(props) {
  //   super(props);
  //   // this.state = { value: '', searching: false };
  // }



  render() {
    const ListItem = <li></li>
    console.log('rendered')
    const results = this.props.results;
    console.log(results);
    const listResults = results.map((result) =>
      <ListItem key={result.show.id} value={result.show} />
    );
    console.log(listResults)
    return <ul> {listResults} </ul>
  }

}

export default SearchResults;

// function ListItem(props) {
//   return <li>{props.value}</li>;
// }

// function PokemonList(props) {
//   const pokedex = props.pokedex;
//   const listItems = pokedex.map((pokemon) =>
//     <ListItem key={pokemon.number} value={pokemon.name} />
//   );
//   return (
//     <ul>
//       {listItems}
//     </ul>
//   );
// }

//fix li react element 
