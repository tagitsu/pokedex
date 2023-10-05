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

const Auth = ({ pokemonsAmount }) => {

  // const [ registerEmail, setRegisterEmail ] = useState('');
  // const [ registerPassword, setRegisterPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ user, setUser ] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, [])

  const register = async () => {
    try {
      console.log('rejestracja rozpoczęta')
      const user = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
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
      const user = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      console.log('zalogowany użytkownik', user);
    } catch (error) {
      console.log(error.message);
    }  };

  const logout = async () => {
    await signOut(auth)
  };

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
        placeholder='email' 
        onChange={(event) => {
          setEmail(event.target.value)
        }} />
        <input 
        placeholder='password' 
        onChange={(event) => {
          setPassword(event.target.value)
        }} />

        <Button onClick={login} text='sign in' />
        <Button onClick={register} text='sign up' />
      </div>}

      { user && 
      <div className='panel__account'>
        <p> Hello {user.email?.substring(0, user.email.indexOf('@')).toUpperCase()}! This is your Pokèdex. </p>
        <Button onClick={logout} text='logout' />
      </div>}
    </div>
  )
};

export default Auth;