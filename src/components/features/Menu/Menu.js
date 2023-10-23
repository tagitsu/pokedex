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
      <section className='menu__button-box'>
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
      <section className='menu__button-box'>
        { utils.getTypes(displayPokemons()).map( type => 
          <button 
            className='menu__button' 
            key={type} 
            onClick={(e) => utils.getPokemonsByType(displayPokemons, type, getSortedPokemons)}
          > 
            <img src={`${process.env.PUBLIC_URL}/images/types/${type}.webp`} alt={type}/>
          </button>
        )}
      </section>
    </div>

  )
};

export default Menu;