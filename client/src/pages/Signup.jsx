import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // To disables signup button
      setLoading(true);
      const res = await fetch('http://localhost:3000/v1/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
      const data = await res.json();

       // If there is an error, we will store it to display to the user later
       if (data.status !== 201) {
        setError(data.errors[0].msg);
        setLoading(false);
        return;
       }
      // If there is no error, we will set the loading to false
      setLoading(false);
      // Setting any previous error to null so we don't display it on screen
      setError(null);
      // we will redirect user to login page
      navigate('/login'); 
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
    <div style={{marginTop: '15vh',marginLeft: '35vw'}}>
      <h2 className="title">Sign Up</h2>
      <form method="POST" onSubmit={handleSubmit} className="form">
        <input className="input-field" type="text" placeholder="username..." id="username" name="username" onChange={handleChange} required/>
        <input className="input-field" type="password" placeholder="password..." id="password" name="password" onChange={handleChange} required/>
        <button type="submit" className="submit-button" disabled={loading}>SIGN IN</button>
        <button type="button" className="google" disabled={loading}>CONTINUE WITH GOOGLE</button>
      </form>
      <p>if already have an account, <Link to={'/login'}><span>login here</span></Link></p>
      <p> Want to play as a guest? then <Link to={'/'}><span> click here</span></Link></p>
      <p className='error-text'>{error ? `${error}`: ''}</p>
    </div>
  )
}
