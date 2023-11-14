import './Pokemon.scss';
import clsx from 'clsx';
import utils from '../../../utils/pokedexUtils';

const Pokemon = ({ pokemon, chooseCard }) => {

  const img = () => { 
    if ( pokemon.appearance.image ) { 
      return pokemon.appearance.image
    } else if (!pokemon.appearance.image && pokemon.appearance.image2) {
      return pokemon.appearance.image2
    } else if (!pokemon.appearance.image && !pokemon.appearance.image2) {
      return pokemon.appearance.image3
    }
  };

  return(
    <button className={clsx('pokemon', `pokemon__${pokemon.types[0].name}`)} onClick={() => chooseCard(pokemon.id)}>
      <div className={clsx('pokemon__image')}>
        <img src={img()} alt={pokemon.name} />
      </div>
    </button>
  );
};

export default Pokemon;