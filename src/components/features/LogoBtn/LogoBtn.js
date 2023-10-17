import './LogoBtn.scss';
import utils from '../../../utils/pokedexUtils';

const LogoBtn = () => {

  return (
    <button className='logo' onClick={utils.reloadPokedex}>
    </button>
  )
};

export default LogoBtn;