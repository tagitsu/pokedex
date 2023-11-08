import './Header.scss';
import Auth from '../../features/Auth/Auth';
import Search from '../../features/Search/Search';

const Header = ({ user }) => {

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