import { useState, useContext } from "react";
import './Search.scss';
import { BsSearch } from 'react-icons/bs';
import utils from "../../../utils/pokedexUtils";
import { AppContext } from "../../../utils/pokedexContexts";

const Search = () => {

  const { 
    allPokemons, 
    setSortedPokemons,
    setPokemonData,
  } = useContext(AppContext);

  const [ search, setSearch ] = useState(''); 

  return (
    <form className='search' onSubmit={(e) => utils.searchPokemon(e, setSortedPokemons, setPokemonData, allPokemons, search)}>
      <input 
        type='text' 
        name='search-input' 
        placeholder="search..."
        autoComplete="off" 
        defaultValue={search} 
        onChange={(event) => setSearch(event.target.value)} 
      />
      <button type='submit'>
        <BsSearch />
      </button>
    </form>
  )
};

export default Search;