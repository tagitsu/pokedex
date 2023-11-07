import './Menu.scss';
import utils from '../../../utils/pokedexUtils';
import { BsFilterCircle } from 'react-icons/bs';

const Menu = ({ displayPokemons, getSortedPokemons }) => {

  return (
    <div className='menu'>
      {/* <BsFilterCircle /> */}
      <section>
        <div className='menu__button-box'>
          { utils.getFirstLetters(displayPokemons()).map( letter => 
            <button 
              className='menu__button'
              key={letter}
              onClick={(e) => utils.getPokemonsByName(displayPokemons, e.target.innerText, getSortedPokemons)}
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
              onClick={() => utils.getPokemonsByType(displayPokemons, type, getSortedPokemons)}
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