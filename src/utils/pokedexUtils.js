import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import axios from "axios";

const utils = {};

// APP
utils.getOffsetTop = (element) => {
  return (element.offsetTop);
};

utils.reloadPokedex = () => {
  window.location.reload();
};

// POKEDEX

utils.searchMyPokemons = (e, getSortedPokemons, setPokemonData, setMyPokemons, userPokemons, search) => {
  e.preventDefault();
  getSortedPokemons(null);
  setPokemonData([]);
  setMyPokemons([]);

  const myPokemons = userPokemons.filter( 
    pokemon => 
    pokemon.name.includes(search) 
    || 
    pokemon.id === search 
  );
  setMyPokemons(myPokemons);
};

utils.searchPokemon = (e, getSortedPokemons, setPokemonData, setMyPokemons, allPokemons, search) => {
  e.preventDefault();
  getSortedPokemons(null);
  setPokemonData([]);
  setMyPokemons([]);

  // czas wyszukania pokemona/pokemonów
  const leadingZero = (time) => {
    return (time < 10) ? '0' + time : time;
  };
  
  const date = new Date();
  const captureTime = `${leadingZero(date.getDate())}.${leadingZero(date.getMonth() +1)}.${date.getFullYear()} ${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}:${leadingZero(date.getSeconds())}`;

  // znalezienie pasujących do wyszukiwania
  const searchMatch = () => {
    const matchingPokemons = allPokemons.filter( pokemon => pokemon.name.includes(search) );
    for ( let i = 0; i < matchingPokemons.length; i++) {
      let pokemon, pokemonTypes = [], pokemonAbilities = [];

      axios.get(matchingPokemons[i].url).then( response => {
        const pokemonObject = response.data;
        console.log(`pokemonObject ${pokemonObject.name}`, pokemonObject);

        for (let i = 0; i < pokemonObject.types.length; i++) {
          pokemonTypes.push({
            name: pokemonObject?.types[i].type.name,
            url: pokemonObject?.types[i].type.url,
          })
        }

        for (let i = 0; i < pokemonObject.abilities.length; i++) {
          pokemonAbilities.push(pokemonObject?.abilities[i].ability.name)
        }
        const getSpeciesInfo = () => {
          if (pokemonObject) {
            axios.get(pokemonObject.species.url).then( response => {
              const pokemonSpecies = response.data;
              const funFacts = pokemonSpecies.flavor_text_entries.filter( text => text.language.name === 'en');
              const genera = pokemonSpecies.genera.filter( text => text.language.name === 'en');
              const pickText = (funFacts) => {
                const index = Math.floor(Math.random() * funFacts.length);
                return funFacts[index]?.flavor_text;
              };

              pokemon = { 
                ...pokemon, 
                habitat: pokemonSpecies.habitat?.name ? pokemonSpecies.habitat.name : null, 
                color: pokemonSpecies.color?.name ? pokemonSpecies.color.name : null,
                text: pickText(funFacts),
                genus: genera[0].genus,
              };
              setPokemonData(pokemonData => [...pokemonData, pokemon]);
            }) 
          }

          pokemon = {
            id: pokemonObject.id,
            name: pokemonObject.name,
            types: pokemonTypes,
            appearance: {
              image: pokemonObject.sprites.other.dream_world.front_default, // pokemonObject.sprites.front_default - ścieżka do grafik pikselowych
              image2: pokemonObject.sprites.other.home.front_default,
              image3: pokemonObject.sprites.front_default,
              height: pokemonObject.height / 10,
              weight: pokemonObject.weight /10,
            },
            stats: {
              hp: pokemonObject.stats[0].base_stat,
              atk: pokemonObject.stats[1].base_stat,
              def: pokemonObject.stats[2].base_stat,
              spAtk: pokemonObject.stats[3].base_stat,
              spDef: pokemonObject.stats[4].base_stat,
              spd: pokemonObject.stats[5].base_stat,
            },
            abilities: pokemonAbilities,
            captureTime: captureTime,
          };
        };
        getSpeciesInfo();
      })
    }
  };
  searchMatch();
};

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
