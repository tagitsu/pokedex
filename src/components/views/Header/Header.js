import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import './Header.scss';
import Auth from '../../features/Auth/Auth';

const Header = ({}) => {

  return(
    <header className='header'>
      <Auth />
    </header>
  )
}

export default Header;