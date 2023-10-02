import './Menu.scss';
import utils from '../../../utils/pokedexUtils';

const Menu = ({ userPokemons, getSortedPokemons }) => {

  return (
    <div className='menu'>
      <section className='menu--letters'>
        <button 
          className='menu__button' 
          onClick={(e) => getSortedPokemons(userPokemons)}
        > 
        all pokemons 
        </button>
      </section>
      <section className='menu--letters'>
        { utils.getFirstLetters(userPokemons).map( letter => 
          <button 
            className='menu__button' 
            key={letter} 
            onClick={(e) => utils.getPokemonsByName(userPokemons, e.target.innerText, getSortedPokemons)}
          > 
            {letter.toUpperCase()} 
          </button>
        )}
      </section>
      <section className='menu--types'>
        { utils.getTypes(userPokemons).map( type => 
          <button 
            className='menu__button' 
            key={type} 
            onClick={(e) => utils.getPokemonsByType(userPokemons, e.target.innerText, getSortedPokemons)}
          > 
            {type} 
          </button>
        )}
      </section>
    </div>

  )
};

export default Menu;