import './LogoBtn.scss';
import utils from '../../../utils/pokedexUtils';
import clsx from 'clsx';

const LogoBtn = () => {

  return (
    <div className='logo'>
      <button className='logo__reload' onClick={utils.reloadPokedex} />
      <button className={clsx('logo__btn', 'logo__btn--red')} />
      <button className={clsx('logo__btn', 'logo__btn--yellow')} />
      <button className={clsx('logo__btn', 'logo__btn--green')} />
    </div>
  )
};

export default LogoBtn;