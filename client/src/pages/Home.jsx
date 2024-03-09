import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/v1/api/users', {
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

  // Function to convert milliseconds to "hr:min:sec:ms" format
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const ms = milliseconds % 1000;
    return `${hours}hr ${minutes}min ${seconds}sec ${ms}ms`
  }

  return (
    <div>
      <div id='start-container'>
        <img src='waldo.png?url' id='waldo-image' />
        <h2>WHERE IS WALDO?</h2>
        <button type="button" className='start-btn'>START NOW</button>
        <div id='auth-link'>
          <span>Want to save your highscore, then </span>
          <Link to='/signup'><span>signup</span></Link>
          <span> or </span>
          <Link to='/login'><span>login</span></Link>
        </div>
        <div id='highscore'>
          <h4>HIGHSCORE</h4>
          <p>{loading ? 'Loading...': ''}</p>
          <ul>
          {formData.users && formData.users.map((item) => (
              <li key={item._id} className='score-list'>
                <p>{item.username}</p>
                <p>{formatTime(item.highScore)}</p>
              </li>
            ))}
          </ul>
          <p>{error ? error.message: ''}</p>
        </div>
      </div>
    </div>
  )
}
