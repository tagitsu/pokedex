import './Pokedex.scss';

import { useState, useEffect } from "react";
import { db } from '../../firebase-config';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

import axios from "axios";
import PokeCard from "../../components/features/PokeCard/PokeCard";
import Button from '../../components/common/Button/Button';

const Pokedex = ({ user }) => {

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ myPokemon, setMyPokemon ] = useState();
  const [ userPokemons, setUserPokemons ] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const data = await getDocs(collection( db, 'users', `${user}`, 'pokedex'));
      setUserPokemons(data.docs.map( doc => ({...doc.data(), id: doc.id})))
    }
    getPokemons();
    }, [user]);

  console.log('pokemony użytkownika', userPokemons);

  const searchPokemon = () => {

    const leadingZero = (time) => {
      return (time < 10) ? '0' + time : time;
    };
    const date = new Date();
    const captureTime = `${leadingZero(date.getDate())}.${leadingZero(date.getMonth() +1)}.${date.getFullYear()} ${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}:${leadingZero(date.getSeconds())}`;



    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then( (response) => {
      const allPokemons = response.data.results;
    const matchingPokemons = allPokemons.filter( pokemon => pokemon.name.includes(search) || pokemon.id === search);
      console.log('pasujące pokemony', search, matchingPokemons);

    matchingPokemons.map( pokemon => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`).then((response) => {
      const pokemonObject = response.data;

      console.log('pokemonObject', pokemonObject);


      let pokemonTypes = [], pokemonAbilities = [], pokemonColor, pokemonHabitat;
      for (let i = 0; i < pokemonObject.types.length; i++) {
        pokemonTypes.push({
          name: pokemonObject?.types[i].type.name,
          url: pokemonObject?.types[i].type.url,
        })
      }

      for (let i = 0; i < pokemonObject.abilities.length; i++) {
        pokemonAbilities.push(pokemonObject?.abilities[i].ability.name)
      }

      for (let i = 1; i <= 9; i++) {
        axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${i}/`).then( response => {
          const habitat = response.data;

          for (let h = 0; h < habitat.pokemon_species.length; h++) {
            if (habitat.pokemon_species[h].name === pokemonObject.name) {
              console.log(`Pokemon ${pokemonObject.name} występuje w ${habitat.name}`);
              pokemonHabitat = habitat.name;
            }
          }
        })
      }

      for (let i = 1; i <= 10; i++) {
        axios.get(`https://pokeapi.co/api/v2/pokemon-color/${i}/`).then( response => {
          const color = response.data;

          for (let c = 0; c < color.pokemon_species.length; c++) {
            if (color.pokemon_species[c].name === pokemonObject.name) {
              console.log(`Pokemon ${pokemonObject.name} jest koloru ${color.name}`);
              pokemonColor = color.name;
            }
          }
        })
      }



      const pokemon = {
        id: pokemonObject.id,
        name: pokemonObject.name,
        types: pokemonTypes,
        appearance: {

          image: pokemonObject.sprites.other.dream_world.front_default, // pokemonObject.sprites.front_default - ścieżka do grafik pikselowych
          image2: pokemonObject.sprites.other.home.front_default,
          image3: pokemonObject.sprites.front_default,
          height: pokemonObject.height / 10,
          weight: pokemonObject.weight /10,
          color: pokemonColor,
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
        habitat: pokemonHabitat,
        captureTime: captureTime,
      }
      setPokemonData(pokemonData => [...pokemonData, pokemon]);
      setMyPokemon();
    }))
    
  
  });

  };

  console.log('wyszukane z bazy pokemony', pokemonData)

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
          { pokemonData && pokemonData.map( pokemon => 
            <PokeCard key={pokemon.id} pokemon={pokemon} addPokemon={addPokemon} myPokemons={userPokemons}/>
          )
          }
          {
            myPokemon && 
            myPokemon.map( pokemon => <PokeCard key={pokemon.id} pokemon={pokemon} />)
          }
        </div>
      </div>
      <p> Ilość złapanych pokemonów: {userPokemons.length} Sortuj wg: </p>

      <div className='pokedex__collection'>
        { userPokemons.length > 0 && 
          userPokemons.map( (pokemon) => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} /> )}
      </div>
    </div>
  )
};

export default Pokedex;