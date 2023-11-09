import './LogoBtn.scss';
import utils from '../../../utils/pokedexUtils';
import clsx from 'clsx';
import {BsChevronDoubleUp, BsQuestion} from 'react-icons/bs';

const LogoBtn = () => {

  const collectionContainer = document.querySelector('.pokedex__collection');

  return (
    <div className='logo'>
      <button className='logo__reload' onClick={utils.reloadPokedex} />
      <button className={clsx('logo__btn', 'logo__btn--red')}>
        <BsQuestion />
      </button>
      <button className={clsx('logo__btn', 'logo__btn--yellow')} onClick={() => utils.handleScrollToTop(collectionContainer)}>
        <BsChevronDoubleUp />
      </button>
      <button className={clsx('logo__btn', 'logo__btn--green')} />
    </div>
  )
};

export default LogoBtn;