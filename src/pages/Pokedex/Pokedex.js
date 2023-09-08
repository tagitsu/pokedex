import './Pokedex.scss';

import { useState, useEffect } from "react";
import { db } from '../../firebase-config';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

import axios from "axios";
import PokeCard from "../../components/features/PokeCard/PokeCard";
import Button from '../../components/common/Button/Button';

const Pokedex = ({ user }) => {

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState();
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
    axios.get(`https://pokeapi.co/api/v2/pokemon/${search}/`).then((response) => {
      const pokemonObject = response.data;

      let pokemonTypes = [], pokemonAbilities = [];
      for (let i = 0; i < pokemonObject.types.length; i++) {
        pokemonTypes.push({
          name: pokemonObject?.types[i].type.name,
          url: pokemonObject?.types[i].type.url,
        })
      }
      for (let i = 0; i < pokemonObject.abilities.length; i++) {
        pokemonAbilities.push(pokemonObject?.abilities[i].ability.name)
      }
      const pokemon = {
        id: pokemonObject.id,
        name: pokemonObject.species.name,
        types: pokemonTypes,
        appearance: {
          image: pokemonObject.sprites.front_default,
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
      }
      setPokemonData(pokemon);
    })
  };

  const searchMyPokemon = () => {
    const [ myPokemon ] = userPokemons.filter( pokemon => pokemon.name === search || pokemon.id === search );
    setMyPokemon(myPokemon);
  }

  const addPokemon = () => {  
    setDoc(doc(db, `users/${user}/pokedex`, `${pokemonData.id}`), pokemonData);
  }

  return (
    <div className='pokedex'>
      <div className='pokedex__search'>
        <div className='pokedex__searching'>
          <input type='text' onChange={(event) => setSearch(event.target.value)}/>
          <Button onClick={searchPokemon} text='Szukaj w bazie Pokedex'/>
          <Button onClick={searchMyPokemon} text='Szukaj w moim Pokedex'/>

        </div>
        <div className='pokedex__result'>
          { pokemonData && 
            <PokeCard pokemon={pokemonData} addPokemon={addPokemon} />
          }
          {
            myPokemon && 
            <PokeCard pokemon={myPokemon} />
          }
        </div>
      </div>
      <div className='pokedex__collection'>
        { userPokemons.length > 0 && 
          userPokemons.map( (pokemon) => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} /> )}
      </div>
    </div>
  )
};

export default Pokedex;