import './Header.scss';
import Auth from '../../features/Auth/Auth';
import LogoBtn from '../../features/LogoBtn/LogoBtn';

const Header = ({ user }) => {

  return(
    <header className='header'>
      <LogoBtn />
      { user && <Auth /> }
    </header>
  )
};

export default Header;