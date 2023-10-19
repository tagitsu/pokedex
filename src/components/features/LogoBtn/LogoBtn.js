import './LogoBtn.scss';
import utils from '../../../utils/pokedexUtils';
import clsx from 'clsx';

const LogoBtn = () => {

  return (
    <div className='logo'>
      <button className='logo__reload' onClick={utils.reloadPokedex}></button>
      <button className={clsx('logo__btn', 'logo__btn--red')}></button>
      <button className={clsx('logo__btn', 'logo__btn--yellow')}></button>
      <button className={clsx('logo__btn', 'logo__btn--green')}></button>
    </div>
  )
};

export default LogoBtn;