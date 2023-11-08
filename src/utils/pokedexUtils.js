import { doc, setDoc, deleteDoc } from "firebase/firestore";
import axios from "axios";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
} from 'firebase/auth';
import { auth, db } from '../firebase-config';


const utils = {};

// APP

utils.toggleVisible = (container, setVisible) => {
  const scrolledScreen = document.documentElement.querySelector(container).scrollTop;
  if ( scrolledScreen > 500) {
    setVisible(true);
  } else {
    setVisible(false);
  }
};

utils.handleScrollToTop = (collectionContainer) => {
  collectionContainer.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
};

utils.reloadPokedex = () => {
  window.location.reload();
};

// AUTHENTICATION

utils.register = async (login, password, setErrorMsg) => {
  const email = `${login}@mail.com`;
  try {
    const user = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    const userAccount = setDoc(doc(db, `users`, `${user.user.uid}`), {
      id: user.user.uid,
    });
} catch (error) {
  const errorCode = error.code;
  console.log(error.message);
  
  setErrorMsg( () => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email is not correct. Please enter a valid email address.';
      case 'auth/missing-password':
        return 'Enter the password.';
      case 'auth/email-already-in-use':
        return `There is user using the ${login} login in our database. Enter correct password and sign in.`;
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.'
      default:
        return null;
    }
  });
  }
};

utils.login = async (login, password, setErrorMsg) => {
  const email = `${login}@mail.com`;
  try {
    const user = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
  } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      
      setErrorMsg( () => {
        switch (errorCode) {
          case 'auth/invalid-email':
            return 'Please enter your login.';
          case 'auth/missing-password':
            return 'Enter the password.';
          case 'auth/wrong-password':
            return 'The password is incorrect.';
          case 'auth/user-not-found':
            return `There is no user using the ${login} login in our database.`;
          default:
            return null;
        }
      });
    }  
};

utils.logout = async () => {
  await signOut(auth)
};

utils.deleteAccount = async () => {
  try {
    const user = auth.currentUser;
    console.log(user.uid);
    await deleteUser(user);
    await deleteDoc(doc(db, `users`, `${user.uid}`));
  } catch (error) {
    console.log(error.code)
  };
}

// SEARCH

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
  if (search) {searchMatch();}
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

// TYPE

utils.getRelations = (type, setRelations, setIsOpen) => {
  axios.get(type.url).then( (response) => {
    const relObjects = Object.entries(response.data.damage_relations);
    setRelations(relObjects);
  });
  setIsOpen(true);
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
  let allTypes = [];
  pokemons.map( pokemon => { for (let i = 0; i < pokemon.types.length; i++) { allTypes.push(pokemon.types[i].name)} } );
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
