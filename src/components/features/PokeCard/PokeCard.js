import './PokeCard.scss';
import clsx from 'clsx';
import Type from '../../common/Type/Type';
import { useContext, useState } from 'react';
import utils from '../../../utils/pokedexUtils';
import { AppContext } from '../../../utils/pokedexContexts';

const PokeCard = ({ pokemon }) => {

  const { user, userPokemons } = useContext(AppContext);

  const [ isActive, setIsActive ] = useState(false);

  const img = () => { 
    if ( pokemon.appearance.image ) { 
      return pokemon.appearance.image
    } else if (!pokemon.appearance.image && pokemon.appearance.image2) {
      return pokemon.appearance.image2
    } else if (!pokemon.appearance.image && !pokemon.appearance.image2) {
      return pokemon.appearance.image3
    }
  };

  console.log(pokemon.name, img());
  
  return(
    <div>
      { !isActive &&
        <article className={clsx('card', `card__${pokemon.types[0].name}`)} onClick={() => setIsActive(!isActive)}>
          <header className={clsx('card__header')}>
            <h1 className='card__title'>
              {utils.nameToUpperCase(pokemon.name)}
            </h1>
            <div className='card__box'>
              <div className='card__hp'>
                <span> HP </span>
                <p> {pokemon.stats.hp} </p> 
              </div>
              <div className='card__types'> 
                {pokemon?.types.map( type => 
                  <Type key={type.name} type={type} />)
                }
              </div>
            </div>
          </header>
          <section className={clsx('card__appearence')} onClick={() => setIsActive(!isActive)}>
            <div className={clsx('card__features')}>
              <p>Height: {pokemon.appearance.height} m</p>
              <p>Weight: {pokemon.appearance.weight} kg</p>
            </div>
            <div className={clsx('card__image')}>
              <img src={img()} alt={pokemon.name} />
            </div>
          </section>
        </article>
      }
      { isActive &&
        <article className={clsx('card', 'card--active', `card__${pokemon.types[0].name}`)} >
          <header className={clsx('card__header')}>
            <div className='card__title'>
              <h1> {utils.nameToUpperCase(pokemon.name)}</h1>
            </div>
            <div className='card__box'>
              <div className='card__hp'>
                <span> HP </span>
                <p> {pokemon.stats.hp} </p> 
              </div>
              <div className='card__types'> 
                {pokemon?.types.map( type => 
                  <Type key={type.name} type={type} />)
                } 
              </div>
            </div>
          </header>
          <section className={clsx('card__appearance', 'card--active__appearance', `card--active__${pokemon.habitat}`)} onClick={() => setIsActive(!isActive)}>
            <div className={clsx('card--active__image')}>
              <img src={img()} alt={pokemon.name} />
            </div>
            <div className={clsx('card__features', 'card--active__features')}>
              <p> No. {pokemon.id} </p>
              <p> {pokemon.genus} </p>
              <p>H: {pokemon.appearance.height} m</p>
              <p>W: {pokemon.appearance.weight} kg</p>
            </div>

          </section>
          <section className={clsx('card--active__stats')}>
            <h2> Stats </h2>
            <p>ATK: {pokemon.stats.atk} </p>
            <p>DEF: {pokemon.stats.def} </p>
            <p>SpATK: {pokemon.stats.spAtk} </p>
            <p>SpDEF: {pokemon.stats.spDef} </p>
            <p>SPD: {pokemon.stats.spd} </p>
          </section>
          <section className={clsx('card--active__abilities')}>
            <h2> Abilities </h2>
              {pokemon?.abilities.map( ability => <p key={ability}> {ability} </p>)}
          </section>
          <section className={clsx('card--active__species')}>
            <h2> Species </h2>
            <p> Color: {pokemon?.color ? pokemon.color : '-'} </p>
            <p> Habitat: {pokemon?.habitat ? pokemon.habitat : '-'} </p>
            <div className={clsx('card--active__fact', `card--active__${pokemon.habitat}`)}> {pokemon?.text ? <p>{pokemon.text}</p> : <p> There is no information about this species </p>} </div>
          </section>
          { 
            userPokemons && !utils.isInPokedex(userPokemons, pokemon.id) && 
            <div className='card--active__adding'>
              <button onClick={() => utils.addPokemon(pokemon, user)} />
            </div>
          }
        </article>
      }
    </div>
  )
};

export default PokeCard;