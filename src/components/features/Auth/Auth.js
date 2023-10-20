import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth, db } from '../../../firebase-config';

import './Auth.scss';

import { doc, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import AccountModal from '../AccountModal/AccountModal';

const Auth = () => {

  // const [ registerEmail, setRegisterEmail ] = useState('');
  // const [ registerPassword, setRegisterPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ user, setUser ] = useState({});
  const [ openModal, setOpenModal ] = useState(false);

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
          onChange={(event) => {
            setEmail(event.target.value)
          }} 
          required 
          />
          <label>email</label>
        </div>
        <div className='panel__input-box'>
          <input 
            onChange={(event) => {
              setPassword(event.target.value)
            }} 
            required
          />
          <label>password</label>
        </div>
        <div className='panel__sign-btn'>
          <button onClick={login}> sign in </button>
          <button onClick={register}> sign up </button>
        </div>
      </div>}

      { user && 
      <div className='panel__account'>
        <p>trainer: <span onClick={handleOpen}> {user.email?.substring(0, user.email.indexOf('@'))}</span></p>
        <AccountModal userEmail={user.email} openModal={openModal} closeModal={handleClose} />
        <button className='panel__logout' onClick={logout}>
          <FontAwesomeIcon icon={faPowerOff} />
        </button>
      </div>}
    </div>
  )
};

export default Auth;