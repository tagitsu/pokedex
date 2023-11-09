import { useState, useContext } from "react";
import './Search.scss';
import { TbDeviceMobileSearch, TbWorldSearch } from 'react-icons/tb';
import utils from "../../../utils/pokedexUtils";
import { AppContext } from "../../../utils/pokedexContexts";

const Search = () => {

  const { 
    allPokemons, 
    userPokemons, 
    setSearchedPokemons, 
    setSortedPokemons 
  } = useContext(AppContext);

  const [ search, setSearch ] = useState(''); 
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ myPokemons, setMyPokemons ] = useState([]);


  if (pokemonData.length) {
    setSearchedPokemons(pokemonData) 
  } else if (myPokemons.length) {
    setSearchedPokemons(myPokemons)
  };


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
      <button onClick={(e) => utils.searchPokemon(e, setSortedPokemons, setPokemonData, setMyPokemons, allPokemons, search)}>
        <TbWorldSearch />
      </button>
      <button onClick={(e) => utils.searchMyPokemons(e, setSortedPokemons, setPokemonData, setMyPokemons, userPokemons, search)}>
        <TbDeviceMobileSearch />
      </button>
    </form>
  )
};

export default Search;