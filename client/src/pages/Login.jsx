import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // To disables signup button
      setLoading(true);
      const res = await fetch('http://localhost:3000/v1/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)
      // If there is an error, we will store it to display to the user later
      if (data.status >= 400) {
        setError(data.message);
        setLoading(false);
        return;
      }
      login(data.token);
      // If there is no error, we will set the loading to false
      setLoading(false);
      // Setting any previous error to null so we don't display it on screen
      setError(null);
      // we will redirect user to home page
      navigate('/'); 
    } catch (error) {
      setLoading(false);
      setError(error.errors);
    }
  };

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  return (
    <div style={{ marginTop: '15vh', marginLeft: '35vw' }}>
      <h2 className="title">Log In</h2>
      <form method="POST" onSubmit={handleSubmit} className="form">
        <input className="input-field" type="text" placeholder="username..." id="username" name="username" onChange={handleChange} required />
        <input className="input-field" type="password" placeholder="password..." id="password" name="password" onChange={handleChange} required />
        <button type="submit" className="submit-button" disabled={loading}>LOGIN</button>
        <button type="button" className="google" disabled={loading}>CONTINUE WITH GOOGLE</button>
      </form>
      <p>Don&apos;t have an account, <Link to={'/signup'}><span>Sign up</span></Link></p>
      <p> Want to play as a guest? then <Link to={'/'}><span> click here</span></Link></p>
      <p className='error-text'>{error ? `${error}` : ''}</p>
    </div>
  )
}
