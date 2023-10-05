import './UpButton.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

const UpButton = ({ container }) => {

  const [ visible, setVisible ] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.querySelector(container).scrollTop;
    console.log(scrolled);
    if ( scrolled > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  console.log(container);
  const elContainer = document.querySelector(container);
  console.log(elContainer);

  elContainer && document.querySelector(container).addEventListener('scroll', () => {
    toggleVisible();
  });

  const handleScrollToTop = (element) => {
    elContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  };

  return(
    <button 
      className={clsx('up', visible ? 'up--visible' : 'up--hidden')}
      onClick={() => handleScrollToTop(container)}
    >
      <FontAwesomeIcon icon={faChevronCircleUp} />
    </button>
    )
};

export default UpButton;