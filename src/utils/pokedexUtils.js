import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';

const utils = {};

// APP
utils.getOffsetTop = (element) => {
  return (element.offsetTop);
}

// POKECARD
utils.nameToUpperCase = (pokemonName) => {
  return pokemonName[0].toUpperCase() + pokemonName.substring(1);
};

utils.isInPokedex = (myPokemons, id) => {
  const pokemonInPokedex = myPokemons.filter( pokemon => pokemon.id == String(id));
  return (Boolean(pokemonInPokedex.length));
};

utils.addPokemon = (pokemon, user) => {
  console.log(pokemon);
  console.log(user);
  setDoc(doc(db, `users/${user}/pokedex`, `${pokemon.id}`), pokemon);
};

// MENU

utils.getFirstLetters = (pokemons) => {
  const allLetters = pokemons.map( pokemon => pokemon.name[0] );
  const sortLetters = allLetters.sort();
  let firstLetters = [];
  for ( let i = 0; i < sortLetters.length; i++) {
    const letter = sortLetters.filter( letter => letter === sortLetters[i]);
    if (!firstLetters.includes(letter[0])) {
      firstLetters = [ ...firstLetters, letter[0] ];
    }
  }
  return (firstLetters);
};

utils.getTypes = (pokemons) => {
  const allTypes = pokemons.map( pokemon => { for (let i = 0; i < pokemon.types.length; i++) { return(pokemon.types[i].name)} } );
  const sortTypes = allTypes.sort();
  let types = [];
  for (let i = 0; i < sortTypes.length; i++) {
    const type = sortTypes.filter( type => type === sortTypes[i]);
    if (!types.includes(type[0])) {
      types = [ ...types, type[0] ];
    }
  }
  return (types);
};

utils.getPokemonsByName = (displayPokemons, letter, getSortedPokemons) => {
   getSortedPokemons(displayPokemons().filter( pokemon => pokemon.name[0] === letter.toLowerCase() ));
};

utils.getPokemonsByType = (displayPokemons, type, getSortedPokemons) => {
  getSortedPokemons(displayPokemons().filter( pokemon => {for(let i = 0; i < pokemon.types.length; i++) { if(pokemon.types[i].name === type) return(true) }}  ));
};




export default utils;
