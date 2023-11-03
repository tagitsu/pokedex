import './UpButton.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

const UpButton = ({ container }) => {

  const [ visible, setVisible ] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.querySelector(container).scrollTop;
    if ( scrolled > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const btnContainer = document.querySelector(container);

  btnContainer && document.querySelector(container).addEventListener('scroll', () => {
    toggleVisible();
  });

  const handleScrollToTop = () => {
    btnContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  };

  return(
    <button 
      className={clsx('up', visible ? 'up--visible' : 'up--hidden')}
      onClick={handleScrollToTop}
    >
      <FontAwesomeIcon icon={faChevronCircleUp} />
    </button>
    )
};

export default UpButton;