import './Pokedex.scss';

import { useState, useEffect } from "react";
import { db } from '../../../firebase-config';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import utils from '../../../utils/pokedexUtils';
import axios from "axios";
import PokeCard from "../../features/PokeCard/PokeCard";
import Button from '../../common/Button/Button';

const Pokedex = ({ user, allPokemons }) => {

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ myPokemon, setMyPokemon ] = useState([]);
  const [ userPokemons, setUserPokemons ] = useState([]);
  const [ sortedPokemons, setSortedPokemons ] = useState(userPokemons);

  useEffect(() => {
    const getPokemons = async() => {
      const data = await getDocs(collection(db, 'users', `${user}`, 'pokedex'));
      setUserPokemons(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getPokemons();
    }, [user]);

  const searchPokemon = () => {

    // czas wyszukania pokemona/pokemonów
    const leadingZero = (time) => {
      return (time < 10) ? '0' + time : time;
    };
    
    const date = new Date();
    const captureTime = `${leadingZero(date.getDate())}.${leadingZero(date.getMonth() +1)}.${date.getFullYear()} ${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}:${leadingZero(date.getSeconds())}`;

      // znalezienie pasujących do wyszukiwania
      const searchMatch = () => {
        const matchingPokemons = allPokemons.filter( pokemon => pokemon.name.includes(search) );
        console.log('pasujące pokemony', search, matchingPokemons.length);
        for ( let i = 0; i < matchingPokemons.length; i++) {
          let pokemon, pokemonTypes = [], pokemonAbilities = []
  
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
                  
                  const pickText = (funFacts) => {
                    const index = Math.floor(Math.random() * funFacts.length);
                    console.log(index, funFacts[index].flavor_text);
                    return funFacts[index]?.flavor_text;
                  }
    
                  pokemon = { 
                    ...pokemon, 
                    habitat: pokemonSpecies.habitat?.name ? pokemonSpecies.habitat.name : null, 
                    color: pokemonSpecies.color?.name ? pokemonSpecies.color.name : null,
                    text: pickText(funFacts)
                  }

                  console.log(`etap II - obiekt pokemon ${pokemonObject.id}`, pokemon);
                  setPokemonData(pokemonData => [...pokemonData, pokemon]);
                  //setMyPokemon();
            
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
              console.log(`etap I - obiekt pokemon ${pokemon.name}`, pokemon);
            }
            getSpeciesInfo();
          })
        }
      }
      searchMatch();
    
  };

  const searchMyPokemon = () => {
    const myPokemon = userPokemons.filter( 
      pokemon => 
      pokemon.name.includes(search) 
      || 
      pokemon.id === search 
    );
    setMyPokemon(myPokemon);
  };

  // TODO Po dodaniu pokemona do mojego Pokedexu chciałabym aby widok odświeżał się od razu.
  const addPokemon = (id) => {
    const [ pokemonToPokedex ] = pokemonData.filter( pokemon => pokemon.id === id);
    setDoc(doc(db, `users/${user}/pokedex`, `${id}`), pokemonToPokedex);
    //window.location.reload();
  };

  const getFirstLetters = () => {
    const allLetters = userPokemons.map( pokemon => pokemon.name[0] );
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

  const getTypes = () => {
    const allTypes = userPokemons.map( pokemon => { for (let i = 0; i < pokemon.types.length; i++) { return(pokemon.types[i].name)} } );
    const sortTypes = allTypes.sort();
    let types = [];
    for (let i = 0; i < sortTypes.length; i++) {
      const type = sortTypes.filter( type => type === sortTypes[i]);
      if (!types.includes(type[0])) {
        types = [ ...types, type[0] ];
      }
    }
    return (types)
  };

  const getPokemonsByName = (letter) => {
    setSortedPokemons(userPokemons.filter( pokemon => pokemon.name[0] == letter.toLowerCase() ));
  };

  const getPokemonsByType = (type) => {
    setSortedPokemons(userPokemons.filter( pokemon => {for(let i = 0; i < pokemon.types.length; i++) { if(pokemon.types[i].name === type) return(true) }}  ));
  }

  return (
    <div className='pokedex'>
      <div className='pokedex__search'>
        <div className='pokedex__inputs'>
          <input type='text' onChange={(event) => setSearch(event.target.value)}/>
          <Button onClick={searchPokemon} text='Szukaj w bazie Pokedex'/>
          <Button onClick={searchMyPokemon} text='Szukaj w moim Pokedex'/>
        </div>
        <div className='pokedex__result'>
          { pokemonData && 
            pokemonData.map( pokemon => 
              <PokeCard key={pokemon.id} pokemon={pokemon} addPokemon={addPokemon} myPokemons={userPokemons}/>
          )
          }
          {
            myPokemon &&
            myPokemon.map( pokemon => 
              <PokeCard key={pokemon.id} pokemon={pokemon} myPokemons={userPokemons}/>)
          }
        </div>
      </div>
      <div className='pokedex__menu'>
          <section className='pokedex__filter'>
            { getFirstLetters().map( letter => <button className='pokedex__button' onClick={(e) => getPokemonsByName(e.target.innerText)}> {letter.toUpperCase()} </button>) }
          </section>
          <section className='pokedex__filter'>
            { getTypes().map( type => <button className='pokedex__button' onClick={(e) => getPokemonsByType(e.target.innerText)}> {type} </button>) }
          </section>

      </div>

      <div className='pokedex__collection'>
        { userPokemons.length > 0 && sortedPokemons.length === 0 ?
          userPokemons.map( (pokemon) => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} /> )
          :
          sortedPokemons.map( (pokemon) => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} /> )
        }
      </div>
    </div>
  )
};

export default Pokedex;