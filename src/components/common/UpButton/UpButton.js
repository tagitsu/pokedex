import './UpButton.scss';

const UpButton = () => {

  const handleUp = (btn) => {
    const offsetTop = btn.offsetTop;
    // TODO stwórz funkcję przewijającą stronę na samą górę
    // TODO przycisk powinien pojawiać się jeśli strona zostanie przewinięta w dół o dany procent
  };

  return(
    <button 
      className='up' 
      onClick={(e) => handleUp(e.target)}
    >
    UP
    </button>
    )
};

export default UpButton;