import axios from "axios";
import { useState } from "react";
import './Search.scss';
import Button from "../../common/Button/Button";
import PokeCard from "../PokeCard/PokeCard";

const Search = ({ user, allPokemons, userPokemons, getSearchedPokemons }) => {

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ myPokemons, setMyPokemons ] = useState([]);

  const searchPokemon = () => {

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
          //console.log(`pokemonObject ${pokemonObject.name}`, pokemonObject);

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
                  //console.log(index, funFacts[index].flavor_text);
                  return funFacts[index]?.flavor_text;
                }
  
                pokemon = { 
                  ...pokemon, 
                  habitat: pokemonSpecies.habitat?.name ? pokemonSpecies.habitat.name : null, 
                  color: pokemonSpecies.color?.name ? pokemonSpecies.color.name : null,
                  text: pickText(funFacts)
                }

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
    setSearch('');
  };

  const searchMyPokemons = () => {
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
    } else {
      getSearchedPokemons(null);
    }
  };

  displaySearchResult();

  return (
    <div className='search'>
    <div className='search__inputs'>
      <input type='text' onChange={(event) => setSearch(event.target.value)} defaultValue={search} />
      <Button onClick={searchPokemon} text='Search the Pokèmon database'/>
      <Button onClick={searchMyPokemons} text='Search my Pokèdex'/>
    </div>
    {/* <div className='search__result'>
      { pokemonData && 
        pokemonData.map( pokemon => 
          <PokeCard key={pokemon.id} user={user} pokemon={pokemon} myPokemons={userPokemons}/>
      )
      }
      {
        myPokemons &&
        myPokemons.map( pokemon => 
          <PokeCard key={pokemon.id} user={user} pokemon={pokemon} myPokemons={userPokemons}/>)
      }
    </div> */}
  </div>
)
};

export default Search;