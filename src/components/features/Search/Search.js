import { useState, useContext } from "react";
import './Search.scss';
import { TbDeviceMobileSearch, TbWorldSearch } from 'react-icons/tb';
import utils from "../../../utils/pokedexUtils";
import { AppContext } from "../../../utils/pokedexContexts";

const Search = () => {

  const { 
    allPokemons, 
    userPokemons, 
    setSortedPokemons,
    setPokemonData,
    setMyPokemons 
  } = useContext(AppContext);

  const [ search, setSearch ] = useState(''); 

  return (
    <form className='search'>
      <input 
        type='text' 
        name='search-input' 
        placeholder="search..."
        autoComplete="off" 
        defaultValue={search} 
        onChange={(event) => setSearch(event.target.value)} 
      />
      <button onClick={(e) => utils.searchPokemon(e, setSortedPokemons, setPokemonData, allPokemons, search)}>
        <TbWorldSearch />
      </button>
      <button onClick={(e) => utils.searchMyPokemons(e, setSortedPokemons, setPokemonData, userPokemons, search)}>
        <TbDeviceMobileSearch />
      </button>
    </form>
  )
};

export default Search;