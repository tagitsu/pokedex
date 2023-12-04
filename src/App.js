import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, db } from './firebase-config'; 
import { onAuthStateChanged } from 'firebase/auth';
import { AppContext } from './utils/pokedexContexts';
import { getDocs, collection } from 'firebase/firestore';
import './App.scss';
import Pokedex from './components/views/Pokedex/Pokedex.js';
import Header from './components/views/Header/Header';
import Auth from './components/features/Auth/Auth';
import LogoBtn from './components/features/LogoBtn/LogoBtn';

function App() {

  const [ user, setUser ] = useState();
  const [ allPokemons, setAllPokemons ] = useState([]);
  const [ userPokemons, setUserPokemons ] = useState([]);
  const [ sortedPokemons, setSortedPokemons ] = useState(null);
  const [ pokemonData, setPokemonData ] = useState([]);
  const [ alert, setAlert ] = useState('');
  const [ displayCard, setDisplayCard ] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser?.uid);
    });
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then( (response) => {
      setAllPokemons(response.data.results);
    });
    const getPokemons = async() => {
      const data = await getDocs(collection(db, 'users', `${user}`, 'pokedex'));
      setUserPokemons(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getPokemons();
  }, [user]);

  return (
    <div className='app' >
      <LogoBtn />
      <AppContext.Provider 
        value={{ 
          user, 
          allPokemons, 
          userPokemons, 
          sortedPokemons,
          setSortedPokemons,
          pokemonData,
          setPokemonData,
          alert,
          setAlert,
          displayCard,
          setDisplayCard
        }}
      >
        <Header />
        { user ? <Pokedex /> : <Auth /> }
      </AppContext.Provider>
    </div>
  );
}

export default App;