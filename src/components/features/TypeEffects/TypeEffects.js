import axios from "axios";
import clsx from 'clsx';
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faBurst, faClose } from "@fortawesome/free-solid-svg-icons";
import './TypeEffects.scss';

const TypeEffects = ({ type, effects, openModal, closeModal }) => {

  const ref = useRef();

  useEffect( () => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);


  // TODO zamień angielskie opisy oddziaływań między typami na polskie

  const translate = (text) => {
    //text.replace(/_/g, ' ')
    switch (text) {
      case 'double_damage_from':
        return 'dostaję podwójne obrażenia od';
      case 'half_damage_from':
        return 'dostaję połowę obrażeń od';
      case 'no_damage_from':
        return 'nie dostaję obrażeń od';
      case 'double_damage_to':
        return 'zadaję podwójne obrażenia';
      case 'half_damage_to':
        return 'zadaję połowę obrażeń';
      case 'no_damage_to':
        return 'nie zadaję żadnych obrażeń';
      default:
        return '-';
    }
  }

  // {item[0].}

  return (
    <dialog className='effects' ref={ref} onCancel={closeModal}>
      <header className='effects__header'>
        <div className='effects__title'>
          <h1> {type.name} </h1> 
          <img src={`${process.env.PUBLIC_URL}/images/types/${type.name}.webp`} alt={`${type.name} type icon`} className='effects__icon'/>
        </div>
        <button className='effects__close' onClick={closeModal}> <FontAwesomeIcon icon={faClose} /> </button>
      </header>
        <div className='effects__container'>
        {effects?.map( item => 
          <ul key={item[0]} className='effects__relation'>
            <h2 className='effects__subtitle'>  {item[0].includes('from') ? <FontAwesomeIcon icon={faShield} /> : <FontAwesomeIcon icon={faBurst} /> } {translate(item[0])} </h2>
            {item[1].map( value => 
              <li key={value.name} className='effects__types'>
                <img src={`${process.env.PUBLIC_URL}/images/types/${value.name}.webp`} alt={`${type.name} type icon`} className='effects__icon'/>
              </li>)} 
          </ul>
        )}
        </div>
    </dialog>
  )
};

export default TypeEffects;