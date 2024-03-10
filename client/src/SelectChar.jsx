import { useEffect, useState, useRef } from "react"
import propTypes from 'prop-types'

export default function SelectChar({ onClose }) {
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
  },[]);

  const handleClickOutside = (event) => {
    if (bgRef.current && event.target === bgRef.current) {
      onClose();
    }
  };

  if (loading)
  { return (
    <div className='select-char-container'>
      <p>Loading....</p>
    </div>)
  }

  if (error)
  { return (
    <div className='select-char-container'>
      <p>{error.message}</p>
    </div>)
  }


  return (
    <div id="bg" ref={bgRef} onClick={handleClickOutside}>
      <div className='select-char-container'  >
          {formData.chars && formData.chars.map((item) => (
                <p key={item._id} className='char-name'>{item.name}</p>
            ))}
      </div>
    </div>
  )
}

SelectChar.propTypes = {
  onClose: propTypes.func,
};
