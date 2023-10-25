import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import clsx from 'clsx';
import { auth, db } from '../../../firebase-config';
import utils from '../../../utils/pokedexUtils';

import './Auth.scss';

import { doc, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { MdCatchingPokemon } from 'react-icons/md';
import AccountModal from '../AccountModal/AccountModal';

const Auth = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ user, setUser ] = useState({});
  const [ openModal, setOpenModal ] = useState(false);
  const [ errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, [])

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return(
    <div className='panel'>
      { !user && 
      <div className='panel__login'>
        <div className='panel__input-box'>
          <input 
          id='email-input'
          onChange={(event) => {
            setEmail(event.target.value)
          }} 
          required 
          />
          <label htmlFor='email-input'>email</label>
        </div>
        <div className='panel__input-box'>
          <input 
            id='password-input'
            type='password'
            onChange={(event) => {
              setPassword(event.target.value)
            }} 
            required
          />
          <label htmlFor='password-input'>password</label>
        </div>
        <div className='panel__sign-btn'>
          <button className={clsx(email && password ? 'panel__activebtn' : 'panel__normalbtn')} onClick={() => utils.login(email, password, setErrorMsg)}> sign in </button>
          <span> If you don't have own Pokèdex yet, go ahead and <button className='panel__normalbtn' onClick={() => utils.register(email, password, setErrorMsg)}> sign up </button></span>
        </div>
        <div className='panel__error'>
          <p> {errorMsg} </p>
        </div>
      </div>}

      { user && 
      <div className='panel__account'>
        <div className='panel__user' onClick={handleOpen}> <MdCatchingPokemon /> {user.email?.substring(0, user.email.indexOf('@'))}</div>
        <AccountModal userEmail={user.email} openModal={openModal} closeModal={handleClose} />
        <button className='panel__logout' onClick={utils.logout}>
          <FontAwesomeIcon icon={faPowerOff} />
        </button>
      </div>}
    </div>
  )
};

export default Auth;