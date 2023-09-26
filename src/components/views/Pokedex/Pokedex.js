import './Pokedex.scss';

import { useState, useEffect } from "react";
import { db } from '../../../firebase-config';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import utils from '../../../utils/pokedexUtils';
import axios from "axios";
import PokeCard from "../../features/PokeCard/PokeCard";
import Button from '../../common/Button/Button';

const Pokedex = ({ user }) => {

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ myPokemon, setMyPokemon ] = useState([]);
  const [ userPokemons, setUserPokemons ] = useState([]);

  console.log(myPokemon);
  
  useEffect(() => {
    async function getPokemons() {
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

    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then( (response) => {
      const allPokemons = response.data.results;

      // znalezienie pasujących do wyszukiwania
      const searchMatch = () => {
        const matchingPokemons = allPokemons.filter( pokemon => pokemon.name.includes(search) || pokemon.id === search);
        console.log('pasujące pokemony', search, matchingPokemons);
        for ( let i = 0; i < matchingPokemons.length; i++) {
          let pokemon, pokemonTypes = [], pokemonAbilities = []
          //console.log(`pasujący pokemon o indeksie ${i}`, matchingPokemons[i].name);
  
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
                  console.log(`pokemon species dla ${pokemonObject.name}`, pokemonSpecies.flavor_text_entries)
                  const funFacts = pokemonSpecies.flavor_text_entries.filter( text => text.language.name === 'en');
                  console.log(funFacts);
                  
                  const pickText = (funFacts) => {
                    const index = Math.floor(Math.random() * funFacts.length);
                    //console.log(`index wylosowany dla ${pokemonObject.name}`, index, pokemonSpecies.funFacts[index]);
                    return funFacts[index].flavor_text;
                  }
    
                  pokemon = { 
                    ...pokemon, 
                    habitat: pokemonSpecies.habitat?.name ? pokemonSpecies.habitat.name : null, 
                    color: pokemonSpecies.color?.name ? pokemonSpecies.color.name : null,
                    text: pickText(funFacts)
                  }

                  console.log(`etap II - obiekt pokemon ${pokemonObject.id}`, pokemon, pokemonSpecies.flavor_text_entries);
                  setPokemonData(pokemonData => [...pokemonData, pokemon]);
                  setMyPokemon();
            
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
    });
  };

  const searchMyPokemon = () => {
    const myPokemon = userPokemons.filter( 
      pokemon => 
      pokemon.name.includes(search) 
      || 
      pokemon.id === search 
    );
    setMyPokemon(myPokemon);
    setPokemonData();
  }

  // TODO Po dodaniu pokemona do mojego Pokedexu chciałabym aby widok odświeżał się od razu.
  const addPokemon = (id) => {
    const [ pokemonToPokedex ] = pokemonData.filter( pokemon => pokemon.id === id);
    setDoc(doc(db, `users/${user}/pokedex`, `${id}`), pokemonToPokedex);
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
              <PokeCard key={pokemon.id} pokemon={pokemon} />)
          }
        </div>
      </div>
      <p> Ilość pokemonów w Pokédex: {userPokemons.length} </p>
      <p> Sortuj wg: </p>

      <div className='pokedex__collection'>
        { userPokemons.length > 0 && 
          userPokemons.map( (pokemon) => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} /> )}
      </div>
    </div>
  )
};

export default Pokedex;