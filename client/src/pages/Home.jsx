import {Link} from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <div id='start-container'>
        <img src='waldo.png?url'id='waldo'/>
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
          <ul>
            <li>Aaa</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
