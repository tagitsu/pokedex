import './Header.scss';
import Auth from '../../features/Auth/Auth';
import LogoBtn from '../../features/LogoBtn/LogoBtn';

const Header = ({}) => {

  return(
    <header className='header'>
      <LogoBtn />
      <Auth />
    </header>
  )
};

export default Header;