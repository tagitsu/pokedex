import './Pokedex.scss';
import { useContext, useRef, useEffect } from "react";
import PokeCard from "../../features/PokeCard/PokeCard";
import Menu from '../../features/Menu/Menu';
import UpButton from '../../common/UpButton/UpButton';
import { AppContext } from '../../../utils/pokedexContexts';
import { IoClose } from 'react-icons/io5';
import Pokemon from '../../features/Pokemon/Pokemon';

const Pokedex = () => {

  const { 
    userPokemons, 
    sortedPokemons,
    pokemonData,
    alert,
    setAlert,
    displayCard,
    setDisplayCard 
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

  const displayChoosenCard = (id) => {

    const choosenCard = displayPokemons().filter( pokemon => pokemon.id === id);
    return(choosenCard);
  };

  const info = <article className='pokedex__info'>
  <h2> You don't have any Pokemon yet </h2>
  <p> Search and catch your first Pokèmons </p>
</article> 


  return (
    <div className='pokedex'>
      <Menu key='menu' displayPokemons={displayPokemons} />
      <div key='collection' className='pokedex__collection'>
        { 
          (!displayCard) 
          ? 
          displayPokemons().map( pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} chooseCard={() => setDisplayCard(pokemon.id)} />)
          :
          displayChoosenCard(displayCard).map( pokemon => <PokeCard key={pokemon.id} pokemon={pokemon} closeCard={() => setDisplayCard(null)} />)
        }
      </div>
      { alert &&
        <dialog className='pokedex__alert' ref={ref} onCancel={() => setAlert('')}>
          <p> I don't know any pokemon with <span>{alert}</span> in its name.</p>
          <button className='pokedex__okAlert' onClick={() => setAlert('')}>OK</button>
          <button className='pokedex__closeAlert' onClick={() => setAlert('')}>
            <IoClose />
          </button>
        </dialog>

      }
      
      <UpButton key='upButton' container={'.pokedex__collection'}/>
    </div>
  )
};

export default Pokedex;