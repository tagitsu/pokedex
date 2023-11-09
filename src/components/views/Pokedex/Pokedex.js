import './Pokedex.scss';
import { useContext } from "react";
import PokeCard from "../../features/PokeCard/PokeCard";
import Menu from '../../features/Menu/Menu';
import UpButton from '../../common/UpButton/UpButton';
import { AppContext } from '../../../utils/pokedexContexts';

const Pokedex = () => {

  const { 
    userPokemons, 
    sortedPokemons,
    pokemonData 
  } = useContext(AppContext);

  const displayPokemons = () => {
    if (!sortedPokemons?.length && !pokemonData.length) {
      return(userPokemons);
    } else if (sortedPokemons?.length && !pokemonData.length) {
      return(sortedPokemons);
    } else if (pokemonData.length && !sortedPokemons?.length) {
      return(pokemonData);
    } else if (pokemonData.length && sortedPokemons?.length) {
      return(sortedPokemons);
    }
  };
  displayPokemons();

  return (
    <div className='pokedex'>
      <Menu displayPokemons={displayPokemons} />
      <div className='pokedex__collection'>
        { 
          (!userPokemons.length && !pokemonData.length) 
          ? 
          <article className='pokedex__info'>
            <h2> You don't have any Pokemon yet </h2>
            <p> Search and catch your first Pokèmons </p>
          </article> 
          :
          displayPokemons().map( pokemon => <PokeCard key={pokemon.id} pokemon={pokemon} />)
        }
      </div>
      <UpButton container={'.pokedex__collection'}/>
    </div>
  )
};

export default Pokedex;