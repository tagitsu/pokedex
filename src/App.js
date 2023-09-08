import { useState } from 'react';

import styles from './App.module.scss';
import Auth from './components/features/Auth/Auth.js';
import Pokedex from './pages/Pokedex/Pokedex.js';
import { auth } from './firebase-config'; 
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';


function App() {

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser?.uid);
    });
  });

  const [ user, setUser ] = useState();

  console.log(`Aktualny użytkownik to ${user}`);

  return (
    <div className={styles.app}>
      <Auth />
      <Pokedex user={user} />
    </div>
  );
}

export default App;
