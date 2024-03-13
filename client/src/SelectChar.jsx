import { useEffect, useState, useRef } from "react"
import propTypes from 'prop-types'

export default function SelectChar({ onClose, xPercent, yPercent }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bgRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/v1/api/chars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // If we click outside of the popup, the popup will close
  const handleClickOutside = (event) => {
    if (bgRef.current && event.target === bgRef.current) {
      onClose();
    }
  };

  // when user clicks on a name, we send a post request with name and coordinates to verify whether the coordinates are correct
  const handleSubmit = async (e, name, xPercent, yPercent) => {
    e.preventDefault();
    try {
      // To disables signup button
      setLoading(true);
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
        setLoading(false);
        return;
      }
      // If there is no error, we will set the loading to false
      setLoading(false);
      // Setting any previous error to null so we don't display it on screen
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  if (loading) {
    return (
      <div id="bg" ref={bgRef} onClick={handleClickOutside}>
        <div className='select-char-container'>
          <p className='char-name'>Loading....</p>
        </div>
      </div>)
  }

  if (error) {
    return (
      <div id="bg" ref={bgRef} onClick={handleClickOutside}>
        <div className='select-char-container'>
          <p className='char-name'>{error.message}</p>
        </div>
      </div>)
  }

  return (
    <div id="bg" ref={bgRef} onClick={handleClickOutside}>
      <div className='select-char-container'  >
        {formData.chars && formData.chars.map((item) => (
          <p key={item._id} className='char-name' onClick={(e) => handleSubmit(e, item.name, xPercent, yPercent)}>{item.name}</p>
        ))}
      </div>
    </div>
  )
}

SelectChar.propTypes = {
  onClose: propTypes.func,
  xPercent: propTypes.number,
  yPercent: propTypes.number,
};
