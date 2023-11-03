import { useState } from "react";
import utils from "../../../utils/pokedexUtils";
import './Type.scss';
import TypeEffects from "../../features/TypeEffects/TypeEffects";

const Type = ({ type }) => {

  const [ relations, setRelations ] = useState();
  const [ isOpen, setIsOpen ] = useState(false);

  const handleOpen = () => {
    utils.getRelations(type, setRelations, setIsOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return(
    <div className='type'>
      <img 
        src={`${process.env.PUBLIC_URL}/images/types/${type.name}.webp`} 
        alt={`${type.name} type icon`} 
        className='type__icon' 
        onClick={handleOpen}
      />
      <TypeEffects type={type} effects={relations} isOpen={isOpen} closeModal={handleClose} />
    </div>
  )
};

export default Type;