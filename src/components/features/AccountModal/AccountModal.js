import clsx from 'clsx';
import { useEffect, useRef, useState} from "react";
import './AccountModal.scss';
import { IoClose, IoWarningOutline } from 'react-icons/io5';
import utils from '../../../utils/pokedexUtils';
const AccountModal = ({ userEmail, openModal, closeModal }) => {

  const ref = useRef();
  const [ verification, setVerification ] = useState('');

  useEffect( () => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (verification === userEmail) {
      utils.deleteAccount();
    } else {
      console.log('invalid email');
    }
  };

  return (
    <dialog className='account' ref={ref} onCancel={closeModal}>
      <header className='account__header'>
        <h1>Delete account</h1>
        <button className={clsx('account__btn', 'account__btn--cancel')} onClick={closeModal}>
          <IoClose />
        </button>
      </header>
      <form className='account__form' onSubmit={(e) => handleDelete(e)}>
        <div className='account__warning'>
          <p>If you want to delete your account, write your email in the box below and submit.</p>
          <p><span><IoWarningOutline /></span> This action is irreversible, all data from your Pokèdex will be deleted along with your account.</p>
        </div>
        <div className='account__input-box'>
          <input type='text' onChange={(e) => setVerification(e.target.value)} required />
          <label>confirm your email address</label>
          <button className={clsx('account__btn', 'account__btn--delete')} type='submit'>Delete account</button>
        </div>
      </form>
    </dialog>
  )
};

export default AccountModal;