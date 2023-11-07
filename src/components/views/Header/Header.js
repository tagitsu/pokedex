import './Header.scss';
import Auth from '../../features/Auth/Auth';

const Header = ({ user }) => {

  return(
    <header className='header'>
      { user && <Auth /> }
    </header>
  )
};

export default Header;