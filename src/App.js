import { useState } from 'react';

import './App.scss';
import Pokedex from './views/Pokedex/Pokedex.js';
import { auth } from './firebase-config'; 
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './views/Header/Header';


function App() {

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser?.uid);
    });
  });

  const [ user, setUser ] = useState();

  console.log(`Aktualny użytkownik to ${user}`);

  return (
    <div className='app'>
      <Header />
      <Pokedex user={user} />
    </div>
  );
}

export default App;
