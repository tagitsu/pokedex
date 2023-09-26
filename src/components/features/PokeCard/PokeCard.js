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

  // INFO wywoływana przy wyświetlaniu przycisku dodawania pokemona do pokedex
  const isInPokedex = (id) => {
    const pokemonInPokedex = myPokemons?.filter( pokemon => pokemon.id === id);
    return Boolean(pokemonInPokedex?.length);
  };

  return(
    <div>
      { !isActive &&
        <article className={clsx('card', `card__${pokemon.types[0].name}`)} onClick={() => setIsActive(!isActive)}>
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
            <div className={clsx('card__features')}>
              <p>Wysokość: {pokemon.appearance.height} m</p>
              <p>Waga: {pokemon.appearance.weight} kg</p>
            </div>
            <div className={clsx('card__image')}>
              <img src={img} alt={pokemon.name} />
            </div>
          </section>
        </article>
      }
      { isActive &&
        <article className={clsx('card', 'card--active', `card__${pokemon.types[0].name}`)} >
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
          <section className={clsx('card__appearance', 'card--active__appearance', `card--active__${pokemon.habitat}`)} onClick={() => setIsActive(!isActive)}>
            <div className={clsx('card--active__image')}>
              <img src={img} alt={pokemon.name} />
            </div>
            <div className={clsx('card__features', 'card--active__features')}>
              <p>Wysokość: {pokemon.appearance.height} m</p>
              <p>Waga: {pokemon.appearance.weight} kg</p>
            </div>

          </section>
          <section className={clsx('card--active__stats')}>
            <h2> Statystyki </h2>
            <p>ATK: {pokemon.stats.atk} </p>
            <p>DEF: {pokemon.stats.def} </p>
            <p>SpATK: {pokemon.stats.spAtk} </p>
            <p>SpDEF: {pokemon.stats.spDef} </p>
            <p>SPD: {pokemon.stats.spd} </p>
          </section>
          <section className={clsx('card--active__abilities')}>
            <h2> Zdolności </h2>
              {pokemon?.abilities.map( ability => <p key={ability}> {ability} </p>)}
          </section>
          <section className={clsx('card--active__species')}>
            <h2> O gatunku </h2>
            <p> Kolor: {pokemon?.color ? pokemon.color : '-'} </p>
            <p> Siedlisko: {pokemon?.habitat ? pokemon.habitat : '-'} </p>
            <div className={clsx('card--active__fact')}> {pokemon?.text ? <p>{pokemon.text}</p> : <p> There is no information about this species </p>} </div>
          </section>
          { 
            // TODO odkomentuj linię poniżej gdy wszystko będzie gotowe!!
            //myPokemons && !(isInPokedex(pokemon.id)) && 
            <div className='card--active__adding'>
              <Button onClick={() => addPokemon(pokemon.id)} />
            </div>
          }
        </article>
      }
    </div>

  )
};

export default PokeCard;