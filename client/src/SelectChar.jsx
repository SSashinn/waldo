import { useState, useRef } from "react"
import propTypes from 'prop-types'

export default function SelectChar({ onClose, xPercent, yPercent, chars, setGameOver}) {
  const [error, setError] = useState(null);
  const bgRef = useRef(null);

  // If we click outside of the popup, the popup will close
  const handleClickOutside = (event) => {
    if (bgRef.current && event.target === bgRef.current) {
      onClose();
    }
  };

  // when user clicks on a name, we send a post request with name and coordinates to verify whether the coordinates are correct
  const handleSubmit = async (e, name, xPercent, yPercent) => {
    e.preventDefault();
    // const target = e.currentTarget;
    try {
      const res = await fetch('http://localhost:3000/v1/api/coordinates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, xPercent, yPercent }),
      });

      const data = await res.json();
      
      // If there is an error, we will store it to display to the user later
      if (data.status >= 400) {
        setError(data);
        return;
      }

      if(data.message === 'Correct'){
        onClose();
        chars.map(item => {
          if(item.name === name)
            item.checked = true;
        const checkDone = chars.filter(item => item.checked === false)
        console.log(checkDone)
        if (checkDone.length === 0)
          setGameOver();
        })
    }
      // Setting any previous error to null so we don't display it on screen
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return (
      <div id="bg" ref={bgRef} onClick={handleClickOutside}>
        <div className='select-char-container'>
          <p className='popup-char-name'>{error.message}</p>
        </div>
      </div>)
  }

  return (
    <div id="bg" ref={bgRef} onClick={handleClickOutside}>
      <div className='select-char-container'>
        {chars && chars.map((item) => (
          <p key={item._id} className='popup-char-name' onClick={(e) => handleSubmit(e, item.name, xPercent, yPercent)}>{item.name}</p>
        ))}
      </div>
    </div>
  )
}

SelectChar.propTypes = {
  onClose: propTypes.func,
  xPercent: propTypes.number,
  yPercent: propTypes.number,
  chars: propTypes.array,
  setGameOver: propTypes.func,
};
