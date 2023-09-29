import { useState } from 'react';
import axios from 'axios';
import './App.scss';
import Pokedex from './components/views/Pokedex/Pokedex.js';
import { auth } from './firebase-config'; 
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/views/Header/Header';


function App() {

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser?.uid);
    });
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then( (response) => {
      setAllPokemons(response.data.results);
    })
  }, []);

  const [ user, setUser ] = useState();
  const [ allPokemons, setAllPokemons ] = useState([])

  console.log(user);
  console.log(allPokemons.length);
  
  return (
    <div className='app'>
      <Header user={user} />
      <Pokedex user={user} allPokemons={allPokemons} />
    </div>
  );
}

export default App;
