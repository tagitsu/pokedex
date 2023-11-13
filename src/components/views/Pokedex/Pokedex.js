import './Pokedex.scss';
import { useContext, useRef, useEffect } from "react";
import PokeCard from "../../features/PokeCard/PokeCard";
import Menu from '../../features/Menu/Menu';
import UpButton from '../../common/UpButton/UpButton';
import { AppContext } from '../../../utils/pokedexContexts';
import { IoClose } from 'react-icons/io5';

const Pokedex = () => {

  const { 
    userPokemons, 
    sortedPokemons,
    pokemonData,
    alert,
    setAlert 
  } = useContext(AppContext);

  const ref = useRef();

  useEffect( () => {
    if (alert) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [alert]);

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
      <Menu key='menu' displayPokemons={displayPokemons} />
      <div key='collection' className='pokedex__collection'>
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
      { alert &&
        <dialog className='pokedex__alert' ref={ref} onCancel={() => setAlert('')}>
        <p> I don't know any pokemon with <span>{alert}</span> in the name.</p>
        <button onClick={() => setAlert('')}>
          <IoClose />
        </button>
      </dialog>
      }
      
      <UpButton key='upButton' container={'.pokedex__collection'}/>
    </div>
  )
};

export default Pokedex;