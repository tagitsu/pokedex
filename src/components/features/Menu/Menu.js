import './Menu.scss';
import utils from '../../../utils/pokedexUtils';

const Menu = ({ userPokemons, displayPokemons, getSortedPokemons }) => {

  return (
    <div className='menu'>
      {/* <section className='menu--letters'>
        <button 
          className='menu__button' 
          onClick={(e) => getSortedPokemons(userPokemons)}
        > 
        my all pokemons 
        </button>
      </section> */}
      <section className='menu__letters'>
        { utils.getFirstLetters(displayPokemons()).map( letter => 
          <button 
            className='menu__button'
            key={letter}
            onClick={(e) => utils.getPokemonsByName(displayPokemons, e.target.innerText, getSortedPokemons)}
          > 
            {letter.toUpperCase()} 
          </button>
        )}
      </section>
      <section className='menu__types'>
        { utils.getTypes(displayPokemons()).map( type => 
          <button 
            className='menu__button' 
            key={type} 
            onClick={(e) => utils.getPokemonsByType(displayPokemons, e.target.innerText, getSortedPokemons)}
          > 
            {type} 
          </button>
        )}
      </section>
    </div>

  )
};

export default Menu;