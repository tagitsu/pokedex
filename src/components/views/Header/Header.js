import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import './Header.scss';
import Auth from '../../features/Auth/Auth';

const Header = ({ user }) => {

  const [ userPokemonsAmount, setUserPokemonsAmount ] = useState();

  useEffect(() => {
    const getPokemons = async() => {
      const data = await getDocs(collection(db, 'users', `${user}`, 'pokedex'));
      setUserPokemonsAmount(data.docs.length);
    }
    getPokemons();
    }, [user]);

  return(
    <header className='header'>
      
      <Auth pokemonsAmount={userPokemonsAmount} />

    </header>
  )
}

export default Header;