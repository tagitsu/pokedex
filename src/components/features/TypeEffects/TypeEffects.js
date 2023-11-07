import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faBurst, faClose } from "@fortawesome/free-solid-svg-icons";
import './TypeEffects.scss';

const TypeEffects = ({ type, effects, isOpen, closeModal }) => {

  const ref = useRef();

  useEffect( () => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  const translate = (text) => {
    switch (text) {
      case 'double_damage_from':
        return 'weak defense';
      case 'half_damage_from':
        return 'strong defense';
      case 'no_damage_from':
        return 'resistance';
      case 'double_damage_to':
        return 'strong attack';
      case 'half_damage_to':
        return 'weak attack';
      case 'no_damage_to':
        return 'unable to deal damage';
      default:
        return '-';
    }
  };

  return (
    <dialog className='effects' ref={ref} onCancel={closeModal}>
      <header className='effects__header'>
        <div className='effects__title'>
          <h1> {type.name} </h1> 
          <img 
            src={`${process.env.PUBLIC_URL}/images/types/${type.name}.webp`} 
            alt={`${type.name} type icon`} 
            className='effects__icon'
          />
        </div>
        <button 
          className='effects__close' 
          onClick={closeModal}
        > 
          <FontAwesomeIcon icon={faClose} /> 
        </button>
      </header>
        <div className='effects__container'>
        {effects?.map( item => 
          <ul key={item[0]} className='effects__relation'>
            <h2 className='effects__subtitle'> {item[0].includes('from') ? <FontAwesomeIcon icon={faShield} /> : <FontAwesomeIcon icon={faBurst} /> } {translate(item[0])} </h2>
            {item[1].map( value => 
              <li key={value.name} className='effects__types'>
                <img 
                  src={`${process.env.PUBLIC_URL}/images/types/${value.name}.webp`} 
                  alt={`${type.name} type icon`} 
                  className='effects__icon'
                />
              </li>
            )} 
          </ul>
        )}
        </div>
    </dialog>
  )
};

export default TypeEffects;