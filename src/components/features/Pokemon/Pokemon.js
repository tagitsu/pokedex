import './Pokemon.scss';
import clsx from 'clsx';
import utils from '../../../utils/pokedexUtils';
import { useState } from 'react';

const Pokemon = ({ pokemon, chooseCard }) => {

  const [ isVisible, setIsVisible ] = useState(false);

  const img = () => { 
    if ( pokemon.appearance.image ) { 
      return pokemon.appearance.image
    } else if (!pokemon.appearance.image && pokemon.appearance.image2) {
      return pokemon.appearance.image2
    } else if (!pokemon.appearance.image && !pokemon.appearance.image2) {
      return pokemon.appearance.image3
    }
  };


  // return(
  //   <button className={clsx('pokemon', `pokemon__${pokemon.types[0].name}`)} onClick={() => chooseCard(pokemon.id)}>
  //     <div className={clsx('pokemon__image')}>
  //       <img src={img()} alt={pokemon.name} />
  //     </div>
  //   </button>
  // );

  // onMouseEnter={() => setIsRolling(true)} onMouseLeave={() => setIsRolling(false)}

  return(
    <button className={clsx('pokemon')} onClick={() => chooseCard(pokemon.id)} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      <div className={clsx('pokemon__pokeball')}/>
      <h2 className={clsx(isVisible && 'pokemon__name', `pokemon__${pokemon.types[0].name}`)}>
        {pokemon.name} <span>#{pokemon.id}</span>
      </h2>
      <div className={clsx('pokemon__image')}>
        <img src={img()} alt={pokemon.name} />
      </div>
    </button>
  );
};

export default Pokemon;