import axios from "axios";
import clsx from 'clsx';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faBurst } from "@fortawesome/free-solid-svg-icons";
import './Type.scss';
import TypeEffects from "../../features/TypeEffects/TypeEffects";

const Type = ({ type }) => {


  const [ relations, setRelations ] = useState();
  const [ openModal, setOpenModal ] = useState(false);

  const getRelations = () => {
    axios.get(type.url).then( (response) => {
      const relObjects = Object.entries(response.data.damage_relations);
      setRelations(relObjects);
    });
    setOpenModal(true);

  };

  const handleOpen = () => {
    getRelations();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return(
    <div className={clsx('type')}>
      <img 
        src={`${process.env.PUBLIC_URL}/images/types/${type.name}.webp`} 
        alt={`${type.name} type icon`} 
        className='type__icon' 
        onClick={handleOpen}
      />
      <TypeEffects type={type} effects={relations} openModal={openModal} closeModal={handleClose} />
    </div>
  )
};

export default Type;