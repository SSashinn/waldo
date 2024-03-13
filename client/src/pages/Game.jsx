import { useEffect, useState, useRef } from "react"
import ImageSelector from "../ImageSelector";
import SelectChar from "../SelectChar";

export default function Game() {
  const [showSelectChar, setShowSelectChar] = useState(false);
  const [time, setTime] = useState(0);
  const selectCharRef = useRef(null);
  const [xPercent, setXPercent] = useState(null);
  const [yPercent, setYPercent] = useState(null);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const ms = milliseconds % 1000;
    return `${hours}hr ${minutes}min ${seconds}sec ${ms}ms`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 100);
    }, 100);
    return () => clearInterval(interval);
  },[]);

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
      <ImageSelector imageUrl="findWaldo.jpg?url" onSelectionChange={handleSelectionChange} />

      {showSelectChar && <div ref={selectCharRef}>
        <SelectChar 
        onClose={handleClosePopup} 
        onSelect={handleSelectionChange} 
        xPercent={xPercent}
        yPercent={yPercent}/>
        </div>}
      </div>  
  )
}
