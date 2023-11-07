import './UpButton.scss';
import { useState } from 'react';
import clsx from 'clsx';
import utils from '../../../utils/pokedexUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

const UpButton = ({ container }) => {

  const [ visible, setVisible ] = useState(false);

  const collectionContainer = document.querySelector(container);

  collectionContainer && document.querySelector(container).addEventListener('scroll', () => {
    utils.toggleVisible(container, setVisible);
  });

  return(
    <button 
      className={clsx('up', visible ? 'up--visible' : 'up--hidden')}
      onClick={() => utils.handleScrollToTop(collectionContainer)}
    >
      <FontAwesomeIcon icon={faChevronCircleUp} />
    </button>
    )
};

export default UpButton;