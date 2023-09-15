import './PokeCard.scss';
import clsx from 'clsx';
import Type from '../../common/Type/Type';
import { useState } from 'react';
import Button from '../../common/Button/Button';


const PokeCard = ({ pokemon, addPokemon, myPokemons }) => {

  const [ isActive, setIsActive ] = useState(false);

  const img = pokemon.appearance.image || pokemon.appearance.image2 || pokemon.appearance.image3;

  const nameToUpperCase = (pokemonName) => {
    return pokemonName[0].toUpperCase() + pokemonName.substring(1);
  };

  const isInPokedex = (id) => {
    const pokemonInPokedex = myPokemons?.filter( pokemon => pokemon.id == id);
    return Boolean(pokemonInPokedex?.length);
  };

  return(
    <div>
      { !isActive &&
        <article className={clsx('card')} onClick={() => setIsActive(!isActive)}>
          <header className={clsx('card__header')}>
            <div className='card__title'>
              <p> #{pokemon.id} </p>
              <h1> {nameToUpperCase(pokemon.name)}</h1>
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
          <section className={clsx('card__appearence')} onClick={() => setIsActive(!isActive)}>
            <div>
              <p>Wysokość: {pokemon.appearance.height} m</p>
              <p>Waga: {pokemon.appearance.weight} kg</p>
            </div>
            <div className={clsx('card__image')}>
              <img src={img} />
            </div>
          </section>
        </article>
      }
      { isActive &&
        <article className={clsx('card', 'card--active')} >
          <header className={clsx('card__header')}>
            <div className='card__title'>
              <p> #{pokemon.id} </p>
              <h1> {nameToUpperCase(pokemon.name)}</h1>
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
          <section className={clsx('card__appearance', 'card--active__appearance')} onClick={() => setIsActive(!isActive)}>
            <div className={clsx('card__image', 'card--active__image')}>
              <img src={img}/>
            </div>
            <div className={clsx('card__features', 'card--active__features')}>
              <p>Wysokość: {pokemon.appearance.height} m</p>
              <p>Waga: {pokemon.appearance.weight} kg</p>
            </div>

          </section>
          <section className={clsx('card--active__stats')}>
            <h2> Statystyki </h2>
            <p>Atak: {pokemon.stats.atk} </p>
            <p>Obrona: {pokemon.stats.def} </p>
            <p>Atak specjalny: {pokemon.stats.spAtk} </p>
            <p>Obrona specjalna: {pokemon.stats.spDef} </p>
            <p>Szybkość: {pokemon.stats.spd} </p>
          </section>
          <section className={clsx('card--active__abilities')}>
            <h2> Zdolności </h2>
            <div className='card__ability'>
              {pokemon?.abilities.map( ability => <p key={ability}> {ability} </p>)}
            </div>
          </section>
          { 
            myPokemons && !(isInPokedex(pokemon.id)) && 
            <div className='card--active__adding'>
              <Button onClick={() => addPokemon(pokemon.id)} text='+'/>
            </div>
          }
        </article>
      }
    </div>

  )
};

export default PokeCard;