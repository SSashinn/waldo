import {Link} from 'react-router-dom';

export default function Signup() {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{marginTop: '15vh',marginLeft: '35vw'}}>
      <h2 className="title">Sign Up</h2>
      <form method="POST" onSubmit={handleSubmit} className="form">
        <input className="input-field" type="text" placeholder="username..." id="username" name="username"/>
        <input className="input-field" type="password" placeholder="password..." id="password" name="password"/>
        <button type="submit" className="submit-button">SIGN IN</button>
        <button type="button" className="google">CONTINUE WITH GOOGLE</button>
      </form>
      <p>if already have an account, <Link to={'/login'}><span>login here</span></Link></p>
      <p> Want to play as a guest? then <Link to={'/'}><span> click here</span></Link></p>
    </div>
  )
}
