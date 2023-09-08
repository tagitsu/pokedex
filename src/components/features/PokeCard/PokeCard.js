import './PokeCard.scss';
import clsx from 'clsx';

import Type from '../../common/Type/Type';
import Button from '../../common/Button/Button';


const PokeCard = ({ pokemon, addPokemon }) => {

  console.log('pokecard', pokemon);

  return(
    <article className='card'>
      <header className={clsx('card__header', 'card__section')}>
        <h1> #{pokemon.id} {pokemon.name} </h1>
        <div className='card__types'> {pokemon?.types.map( type => 
          <Type key={type.name} type={type} />)} 
        </div>
      </header>
      <section className={clsx('card__appearance', 'card__section')}>
        <div className='card__image'>
          <img src={pokemon.appearance.image}/>
        </div>
        <div className={clsx('card__features', 'card__section')}>
          <p>Wysokość: {pokemon.appearance.height} m</p>
          <p>Waga: {pokemon.appearance.weight} kg</p>
        </div>
      </section>
      <section className={clsx('card__abilities', 'card__section')}>
        <h2> Zdolności </h2>
        {pokemon?.abilities.map( ability => <div key={ability}> {ability} </div>)}
      </section>
      <section className={clsx('card__stats', 'card__section')}>
        <h2> Statystyki </h2>
        <p>Punkty życia: {pokemon.stats.hp} </p>
        <p>Atak: {pokemon.stats.atk} </p>
        <p>Obrona: {pokemon.stats.def} </p>
        <p>Atak specjalny: {pokemon.stats.spAtk} </p>
        <p>Obrona specjalna: {pokemon.stats.spDef} </p>
        <p>Szybkość: {pokemon.stats.spd} </p>
      </section>
      { addPokemon && <Button onClick={addPokemon} text='Dodaj do mojego Pokedex'/> }
    </article>
  )
};

export default PokeCard;