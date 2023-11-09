import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import clsx from 'clsx';
import { auth } from '../../../firebase-config';
import utils from '../../../utils/pokedexUtils';
import { FaCircleUser, FaPowerOff } from 'react-icons/fa6';
import './Auth.scss';
import AccountModal from '../AccountModal/AccountModal';

const Auth = () => {

  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ user, setUser ] = useState({});
  const [ openModal, setOpenModal ] = useState(false);
  const [ errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, []);

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
          id='login-input'
          autoComplete="off"
          onChange={(event) => {
            setLogin(event.target.value)
          }} 
          required 
          />
          <label htmlFor='login-input'>login</label>
        </div>
        <div className='panel__input-box'>
          <input 
            id='password-input'
            autoComplete="off"
            type='password'
            onChange={(event) => {
              setPassword(event.target.value)
            }} 
            required
          />
          <label htmlFor='password-input'>password</label>
        </div>
        <div className='panel__sign-btn'>
          <button 
            className={clsx(login && password ? 'panel__activebtn' : 'panel__normalbtn')} 
            onClick={() => utils.login(login, password, setErrorMsg)}
          > 
            sign in 
          </button>
          <span> If you don't have own Pokèdex yet, go ahead and 
            <button 
              className='panel__normalbtn' 
              onClick={() => utils.register(login, password, setErrorMsg)}
            > 
              sign up 
            </button>
          </span>
        </div>
        <div className='panel__error'>
          <p> {errorMsg} </p>
        </div>
      </div>}

      { user && 
        <div className='panel__account'>
          <div className='panel__user' onClick={handleOpen}> 
            <FaCircleUser /> {user.email?.substring(0, user.email.indexOf('@'))}
          </div>
          <AccountModal 
            userLogin={user.email?.substring(0, user.email.indexOf('@'))} 
            openModal={openModal} 
            closeModal={handleClose} 
          />
          <button 
            className='panel__logout' 
            onClick={utils.logout}
          >
            <FaPowerOff />
          </button>
        </div>
      }
    </div>
  );
};

export default Auth;