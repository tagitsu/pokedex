import './Header.scss';
import Auth from '../../features/Auth/Auth';
import Search from '../../features/Search/Search';
import { AppContext } from '../../../utils/pokedexContexts';
import { useContext } from 'react';

const Header = () => {

  const { user } = useContext(AppContext);
  
  if (user) {
    return(
      <header className='header'>
        <Search />
        <Auth />
      </header>
    )
  }
};

export default Header;