import './Menu.scss';
import utils from '../../../utils/pokedexUtils';
import { useContext } from 'react';
import { AppContext } from '../../../utils/pokedexContexts';

const Menu = ({ displayPokemons }) => {

  const { setSortedPokemons } = useContext(AppContext);

  return (
    <div className='menu'>
      <section>
        <div className='menu__button-box'>
          { utils.getFirstLetters(displayPokemons()).map( letter => 
            <button 
              className='menu__button'
              key={letter}
              onClick={(e) => utils.getPokemonsByName(displayPokemons, e.target.innerText, setSortedPokemons)}
            > 
              {letter.toUpperCase()} 
            </button>
          )}
        </div>
      </section>
      <section>
        <div className='menu__button-box'>
          { utils.getTypes(displayPokemons()).map( type => 
            <button 
              className='menu__button' 
              key={type} 
              onClick={() => utils.getPokemonsByType(displayPokemons, type, setSortedPokemons)}
            > 
              <img src={`${process.env.PUBLIC_URL}/images/types/${type}.webp`} alt={type}/>
            </button>
          )}
        </div>
      </section>
    </div>
  )
};

export default Menu;