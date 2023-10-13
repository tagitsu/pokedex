import { useState } from 'react';
import axios from 'axios';
import './App.scss';
import Pokedex from './components/views/Pokedex/Pokedex.js';
import { auth } from './firebase-config'; 
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/views/Header/Header';
import Auth from './components/features/Auth/Auth';
import UpButton from './components/common/UpButton/UpButton';
import utils from './utils/pokedexUtils';
import LogoBtn from './components/features/LogoBtn/LogoBtn';

function App() {

  const [ user, setUser ] = useState();
  const [ allPokemons, setAllPokemons ] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser?.uid);
    });
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then( (response) => {
      setAllPokemons(response.data.results);
    })
  }, [user]);

  return (
    <div className='app' >
      <LogoBtn />
      <Header user={user} />
      { user ? <Pokedex user={user} allPokemons={allPokemons} /> : <Auth /> }
    </div>
  );
}

export default App;
