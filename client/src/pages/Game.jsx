import { useEffect, useState, useRef } from "react"
import ImageSelector from "../ImageSelector";
import SelectChar from "../SelectChar";

export default function Game() {
  const [showSelectChar, setShowSelectChar] = useState(false);
  const [time, setTime] = useState(0);
  const selectCharRef = useRef(null);
  const [xPercent, setXPercent] = useState(null);
  const [yPercent, setYPercent] = useState(null);
  const [chars, setChars] = useState([]);
  const [error, setError] = useState(null);
  const[gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
  }

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const ms = milliseconds % 1000;
    return `${hours}hr ${minutes}min ${seconds}sec ${ms}ms`
  }

  //  Get list of character
  async function fetchData() {
    try {
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
      const updatedData = data.chars.map(char => ({ ...char, checked: false }));
      setChars(updatedData);
    } catch (error) {
      setError(error);
    } 
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Create a timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 100);
    }, 100);
    if (gameOver)
      clearInterval(interval);
    return () => clearInterval(interval);
  },[gameOver]);

  // To show popup with list of characters when image is clicked
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectCharRef.current && !selectCharRef.current.contains(event.target)) {
        setShowSelectChar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectionChange = (selection) => {
    setXPercent(() => selection.xPercent);
    setYPercent(() => selection.yPercent);
    setShowSelectChar(true);
  };

  const handleClosePopup = () => {
    setShowSelectChar(false);
  };

  return (
    <div>
      <div className="timer-heading-container">
          <h2>TIMER: {formatTime(time)}</h2>
          <div className="heading">
            <h2>WHERE IS WALDO?</h2>
            <h3>Try to find waldo as soon as possible</h3>
          </div>
      </div>
      <div className="main-content">
        <div className="char-info">
          <p>{error ? error.message: ''}</p>
          {chars && chars.map((item) => (
            <div key={item._id}>
              <img src={item.imgUrl} height='100px' width='100px'/>
              <p key={item._id} className='char-name'>{item.name}</p>
            </div>
          ))}
        </div>
        <ImageSelector imageUrl="findWaldo.jpg?url" onSelectionChange={handleSelectionChange} />
      </div>

      {showSelectChar && <div ref={selectCharRef}>
        <SelectChar 
        onClose={handleClosePopup} 
        onSelect={handleSelectionChange} 
        xPercent={xPercent}
        yPercent={yPercent}
        chars={chars}
        setGameOver={handleGameOver}/>
        </div>}
      </div>  
  )
}
