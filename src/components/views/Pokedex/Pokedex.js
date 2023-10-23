import './Pokedex.scss';

import { useState, useEffect } from "react";
import { db } from '../../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import PokeCard from "../../features/PokeCard/PokeCard";
import Search from '../../features/Search/Search';
import Menu from '../../features/Menu/Menu';
import UpButton from '../../common/UpButton/UpButton';

const Pokedex = ({ user, allPokemons }) => {

  const [ userPokemons, setUserPokemons ] = useState([]);
  const [ sortedPokemons, setSortedPokemons ] = useState(null);
  const [ searchedPokemons, setSearchedPokemons ] = useState(null);

  useEffect(() => {
    const getPokemons = async() => {
      const data = await getDocs(collection(db, 'users', `${user}`, 'pokedex'));
      setUserPokemons(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getPokemons();
    }, [user]);

    console.log(searchedPokemons);

  const getSortedPokemons = (pokemons) => {
    setSortedPokemons(pokemons);
  };

  const getSearchedPokemons = (pokemons) => {
    setSearchedPokemons(pokemons);
  };

  const displayPokemons = () => {
    if (!sortedPokemons?.length && !searchedPokemons) {
      return(userPokemons);
    } else if (sortedPokemons?.length && !searchedPokemons) {
      return(sortedPokemons);
    } else if (searchedPokemons && !sortedPokemons?.length) {
      return(searchedPokemons);
    } else if (searchedPokemons && sortedPokemons?.length) {
      return(sortedPokemons);
    }
  };

  displayPokemons();

  const info = <article className='pokedex__info'>
  <h2> You don't have any Pokemon yet </h2>
  <p> Search and catch your first Pokèmons </p>
</article>

  return (
    <div className='pokedex'>
      <Search user={user} allPokemons={allPokemons} userPokemons={userPokemons} getSearchedPokemons={getSearchedPokemons} getSortedPokemons={getSortedPokemons} />
      <Menu userPokemons={userPokemons} getSortedPokemons={getSortedPokemons} displayPokemons={displayPokemons} />
      <div className='pokedex__collection'>
        { !userPokemons.length && !searchedPokemons && info }
        { displayPokemons().map( pokemon => <PokeCard key={pokemon.id.toString()} user={user} pokemon={pokemon} userPokemons={userPokemons} />) }
      </div>
      <UpButton container={'.pokedex__collection'}/>
    </div>
  )
};

export default Pokedex;