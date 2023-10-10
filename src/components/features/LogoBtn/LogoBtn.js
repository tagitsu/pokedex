import './LogoBtn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import utils from '../../../utils/pokedexUtils';

const LogoBtn = () => {

  return (
    <button className='logo' onClick={utils.reloadPokedex}>
      <FontAwesomeIcon icon={faArrowsRotate} />
    </button>
  )
};

export default LogoBtn;