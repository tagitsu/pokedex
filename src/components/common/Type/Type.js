import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faBurst } from "@fortawesome/free-solid-svg-icons";
import './Type.scss';
const Type = ({ type }) => {


  const [ relations, setRelations ] = useState();
  const [ isVisible, setIsVisible ] = useState(false);

  // TODO zamień angielskie opisy oddziaływań między typami na polskie

  const getRelations = () => {
    axios.get(type.url).then( (response) => {
      const relObjects = Object.entries(response.data.damage_relations);
      console.log('rel', relObjects);
      //const relNames = Object.keys(response.data.damage_relations);
      //console.log('rel names', relNames);
      //const relValues = Object.values(response.data.damage_relations);
      //console.log('rel val', relValues);


      setRelations(relObjects);
    });
    setIsVisible(!isVisible);
  };


  return(
    <div className='type'>
      <img src={`${process.env.PUBLIC_URL}/images/types/${type.name}.webp`} alt={`${type.name} type icon`} className='type__icon' onClick={getRelations}/>
      { isVisible && 
        <dialog className='relations' open>
          <header className='relations__title'> {type.name} <img src={`${process.env.PUBLIC_URL}/images/types/${type.name}.webp`} alt={`${type.name} type icon`} className='relations__icon'/> </header>
            <div className='relations__container'>
            {relations?.map( item => 
              <ul key={item[0]} className='relations__relation'>
                <h2 className='relations__subtitle'> {item[0].replace(/_/g, ' ')} { item[0].includes('from') ? <FontAwesomeIcon icon={faShield} /> : <FontAwesomeIcon icon={faBurst} /> } </h2>
                {item[1].map( value => 
                  <li key={value.name} className='relations__types'>
                    {value.name} 
                    <img src={`${process.env.PUBLIC_URL}/images/types/${value.name}.webp`} alt={`${type.name} type icon`} className='relations__icon' onClick={getRelations}/>
                  </li>)} 
              </ul>
            )}
            </div>
        </dialog>
      }
    </div>
  )
};

export default Type;