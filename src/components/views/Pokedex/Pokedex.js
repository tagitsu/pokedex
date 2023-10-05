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
  const [ sortedPokemons, setSortedPokemons ] = useState(userPokemons);
  const [ searchedPokemons, setSearchedPokemons ] = useState(null);

  useEffect(() => {
    const getPokemons = async() => {
      const data = await getDocs(collection(db, 'users', `${user}`, 'pokedex'));
      setUserPokemons(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getPokemons();
    }, [user]);

  const getSortedPokemons = (pokemons) => {
    setSortedPokemons(pokemons);
  };

  const getSearchedPokemons = (pokemons) => {
    setSearchedPokemons(pokemons);
  };

  const displayPokemons = () => {
    if (!sortedPokemons.length && !searchedPokemons) {
      return(userPokemons);
    } else if (sortedPokemons.length && !searchedPokemons) {
      return(sortedPokemons);
    } else if (searchedPokemons) {
      return(searchedPokemons);
    }
  };

  displayPokemons();

  return (
    <div className='pokedex'>
      <Search user={user} allPokemons={allPokemons} userPokemons={userPokemons} getSearchedPokemons={getSearchedPokemons} />
      <Menu userPokemons={userPokemons} getSortedPokemons={getSortedPokemons}/>

      <div className='pokedex__collection'>
        {/* { userPokemons.length > 0 && sortedPokemons.length === 0 ?
          userPokemons.map( (pokemon) => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} /> )
          :
          sortedPokemons.map( (pokemon) => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} /> )
        } */}
        { displayPokemons().map( pokemon => <PokeCard key={pokemon.id.toString()} pokemon={pokemon} />)}
      </div>
      <UpButton container={'.pokedex__collection'}/>
    </div>
  )
};

export default Pokedex;