import axios from "axios";
import { useState } from "react";
import './Search.scss';
import Button from "../../common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faGlassWaterDroplet, faGlobe, faMobileRetro, faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import {TbDeviceGamePad, TbDeviceMobileSearch, TbWorldSearch} from 'react-icons/tb';

const Search = ({ user, allPokemons, userPokemons, getSearchedPokemons, getSortedPokemons }) => {

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ myPokemons, setMyPokemons ] = useState([]);

  console.log(search);
  const searchPokemon = () => {
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
                console.log(pokemonSpecies);
                const funFacts = pokemonSpecies.flavor_text_entries.filter( text => text.language.name === 'en');
                const genera = pokemonSpecies.genera.filter( text => text.language.name === 'en');
                console.log(genera[0].genus);
                const pickText = (funFacts) => {
                  const index = Math.floor(Math.random() * funFacts.length);
                  //console.log(index, funFacts[index].flavor_text);
                  return funFacts[index]?.flavor_text;
                };
  
  
                pokemon = { 
                  ...pokemon, 
                  habitat: pokemonSpecies.habitat?.name ? pokemonSpecies.habitat.name : null, 
                  color: pokemonSpecies.color?.name ? pokemonSpecies.color.name : null,
                  text: pickText(funFacts),
                  genus: genera[0].genus,
                };

                //console.log(`etap II - obiekt pokemon ${pokemonObject.id}`, pokemon);
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
            //console.log(`etap I - obiekt pokemon ${pokemon.name}`, pokemon);
          };
          getSpeciesInfo();
        })
      }
    };
    searchMatch();
  };

  const searchMyPokemons = () => {
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

  const displaySearchResult = () => {
    if (pokemonData.length) {
      getSearchedPokemons(pokemonData);
    } else if (myPokemons.length) {
      getSearchedPokemons(myPokemons);
    }
  };

  if (pokemonData.length || myPokemons.length) {
    displaySearchResult();
  }

  return (
    <div className='search'>
      <input type='text' defaultValue={search} onChange={(event) => setSearch(event.target.value)} />
      <button onClick={searchPokemon}>
        <TbWorldSearch />
      </button>
      <button onClick={searchMyPokemons}>
        <TbDeviceMobileSearch />
      </button>
    </div>
)
};

export default Search;