import { useEffect, useState } from "react"
import ImageSelector from "../ImageSelector";

export default function Game() {
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const ms = milliseconds % 1000;
    return `${hours}hr ${minutes}min ${seconds}sec ${ms}ms`
  }

  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 100)
    }, 100);
    return () => clearInterval(interval);
  },[])

  const handleSelectionChange = (selection) => {
    console.log("Selected area:", selection);
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

      {/* <img src="findWaldo.jpg?url" className="find-waldo-img" onClick={handleSelectionChange}/> */}
      </div>  
  )
}
