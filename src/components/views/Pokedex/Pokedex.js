import './Pokedex.scss';
import { useContext } from "react";
import PokeCard from "../../features/PokeCard/PokeCard";
import Menu from '../../features/Menu/Menu';
import UpButton from '../../common/UpButton/UpButton';
import { AppContext } from '../../../utils/pokedexContexts';

const Pokedex = () => {

  const { 
    user, 
    userPokemons, 
    searchedPokemons, 
    setSearchedPokemons, 
    sortedPokemons, 
    setSortedPokemons 
  } = useContext(AppContext);


  const displayPokemons = () => {
    if (!sortedPokemons?.length && !searchedPokemons) {
      return(userPokemons);
    } else if (sortedPokemons?.length && !searchedPokemons) {
      return(sortedPokemons);
    } else if (searchedPokemons && !sortedPokemons?.length) {
      return(searchedPokemons);
    } else if (searchedPokemons && sortedPokemons?.length) {
      return(sortedPokemons);
    }
  };

  displayPokemons();

  const info = 
    <article className='pokedex__info'>
      <h2> You don't have any Pokemon yet </h2>
      <p> Search and catch your first Pokèmons </p>
    </article>

  return (
    <div className='pokedex'>
      <Menu displayPokemons={displayPokemons} />
      <div className='pokedex__collection'>
        { (!userPokemons.length && !searchedPokemons) && info }
        { displayPokemons().map( pokemon => <PokeCard key={pokemon.id.toString()} user={user} pokemon={pokemon} userPokemons={userPokemons} />) }
      </div>
      <UpButton container={'.pokedex__collection'}/>
    </div>
  )
};

export default Pokedex;