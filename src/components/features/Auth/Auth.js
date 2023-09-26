import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth, db } from '../../../firebase-config';

import './Auth.scss';

import Button from '../../common/Button/Button';
import { doc, setDoc } from 'firebase/firestore';

const Auth = () => {

  // const [ registerEmail, setRegisterEmail ] = useState('');
  // const [ registerPassword, setRegisterPassword ] = useState('');
  const [ loginEmail, setLoginEmail ] = useState('');
  const [ loginPassword, setLoginPassword ] = useState('');

  const [ user, setUser ] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  })


  const register = async () => {
    try {
      console.log('rejestracja rozpoczęta')
      const user = await createUserWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      );
      console.log('nowy użytkownik', user.user.uid);
      const userAccount = setDoc(doc(db, `users`, `${user.user.uid}`), {
        id: user.user.uid,
      });
      console.log(`Dane użytkownika zostały dodane do firestore`, userAccount);
} catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      console.log('logowanie rozpoczęte')
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      );
      console.log('zalogowany użytkownik', user);
    } catch (error) {
      console.log(error.message);
    }  };

  const logout = async () => {
    await signOut(auth)
  };

  console.log('auth - current', auth.currentUser, 'auth - user state', user);

  return(
    <div className='panel'>
      {/* { !user && 
      <div className='panel__registration'>
        <p> Zarejestruj się </p>
        <input 
          placeholder='Email...' 
          onChange={(event) => {
            setRegisterEmail(event.target.value)
          }} />
        <input 
        placeholder='Hasło...' 
        onChange={(event) => {
          setRegisterPassword(event.target.value)
        }} />
      </div>} */}

      { !user && 
      <div className='panel__login'>
        <input 
        placeholder='Email...' 
        onChange={(event) => {
          setLoginEmail(event.target.value)
        }} />
        <input 
        placeholder='Hasło...' 
        onChange={(event) => {
          setLoginPassword(event.target.value)
        }} />

        <Button onClick={login} text='Zaloguj' />
        <Button onClick={register} text='Zarejestruj' />
      </div>}

      { user && 
      <div className='panel__account'>
        <p> To jest Pokèdex użytkownika {user.email?.substring(0, user.email.indexOf('@'))} </p>
        <Button onClick={logout} text='wyloguj' />
      </div>}
    </div>
  )
};

export default Auth;