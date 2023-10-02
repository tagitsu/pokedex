import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';

const utils = {};

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
  setDoc(doc(db, `users/${user}/pokedex`, `${pokemon.id}`), pokemon);
};

export default utils;
