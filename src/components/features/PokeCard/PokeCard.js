import './PokeCard.scss';
import clsx from 'clsx';
import Type from '../../common/Type/Type';
import { useContext, useState, useRef, useEffect } from 'react';
import utils from '../../../utils/pokedexUtils';
import { AppContext } from '../../../utils/pokedexContexts';
import { IoClose } from 'react-icons/io5';

const PokeCard = ({ pokemon, closeCard }) => {

  const { user, userPokemons } = useContext(AppContext);

  const [ info, setInfo ] = useState(false);

  const ref = useRef();

  useEffect( () => {
    if (info) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [info]);

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
    <div>
      <button className='card__closeInfo' onClick={closeCard}><IoClose /></button>
      <article className={clsx('card', `card__${pokemon.types[0].name}`)} >
        <header className={clsx('card__header')}>
          <h1 className='card__title'> {utils.nameToUpperCase(pokemon.name)}</h1>
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
        <section className={clsx('card__appearance', 'card__appearance', `card__${pokemon.habitat}`)} onClick={closeCard}>
          <div className={clsx('card__image')}>
            <img src={img()} alt={pokemon.name} />
          </div>
          <div className={clsx('card__features')}>
            <p> No. {pokemon.id} </p>
            <p> {pokemon.genus} </p>
            <p>H: {pokemon.appearance.height} m</p>
            <p>W: {pokemon.appearance.weight} kg</p>
          </div>
        </section>
        <section className={clsx('card__stats')}>
          <h2> Stats </h2>
          <p>ATK: {pokemon.stats.atk} </p>
          <p>DEF: {pokemon.stats.def} </p>
          <p>SpATK: {pokemon.stats.spAtk} </p>
          <p>SpDEF: {pokemon.stats.spDef} </p>
          <p>SPD: {pokemon.stats.spd} </p>
        </section>
        <section className={clsx('card__abilities')}>
          <h2> Abilities </h2>
            {pokemon?.abilities.map( ability => <p key={ability}> {ability} </p>)}
        </section>
        <section className={clsx('card__species')}>
          <h2> Species </h2>
          <p> Color: {pokemon?.color ? pokemon.color : '-'} </p>
          <p> Habitat: {pokemon?.habitat ? pokemon.habitat : '-'} </p>
          <div className={clsx('card__fact', `card__${pokemon.habitat}`)}> {pokemon?.text ? <p>{pokemon.text}</p> : <p> There is no information about this species </p>} </div>
        </section>
        { 
          userPokemons && !utils.isInPokedex(userPokemons, pokemon.id) && 
          <div className='card__adding'>
            <button onClick={() => utils.addPokemon(pokemon, user, setInfo)} />
          </div>
        }
        { info &&
        <dialog className='card__info' ref={ref} onCancel={() => setInfo(false)}>
          <p> You have {utils.nameToUpperCase(pokemon.name)} in your collection! </p>
          <button className='card__closeInfo' onClick={() => setInfo(false)}>
            <IoClose />
          </button>
          <button className='card__okInfo' onClick={() => setInfo(false)}>OK</button>
        </dialog>
        }
      </article>
    </div>
  );
};

export default PokeCard;