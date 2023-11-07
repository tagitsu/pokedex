import { useState } from "react";
import './Search.scss';
import { TbDeviceMobileSearch, TbWorldSearch } from 'react-icons/tb';
import utils from "../../../utils/pokedexUtils";

const Search = ({ allPokemons, userPokemons, getSearchedPokemons, getSortedPokemons }) => {

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ myPokemons, setMyPokemons ] = useState([]);

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
    <form className='search'>
      <input 
        type='text' 
        name='search-input' 
        placeholder="search..."
        autocomplete="off" 
        defaultValue={search} 
        onChange={(event) => setSearch(event.target.value)} 
      />
      <button onClick={(e) => utils.searchPokemon(e, getSortedPokemons, setPokemonData, setMyPokemons, allPokemons, search)}>
        <TbWorldSearch />
      </button>
      <button onClick={(e) => utils.searchMyPokemons(e, getSortedPokemons, setPokemonData, setMyPokemons, userPokemons, search)}>
        <TbDeviceMobileSearch />
      </button>
    </form>
  )
};

export default Search;