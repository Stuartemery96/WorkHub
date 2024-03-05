import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service'
import './NavBar.css'


export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/">TRANSACTIONS</Link>
      &nbsp; | &nbsp;
      <Link to="/clients">CLIENTS</Link>
      &nbsp; | &nbsp;
      <a href="https://mail.google.com/" target="_blank">EMAIL</a>
      &nbsp; | &nbsp;
      <a href="https://calendar.google.com/" target="_blank">CALENDAR</a>
      &nbsp; &nbsp;<span>Welcome, {user.name.split(' ')[0].toUpperCase()}</span>
      &nbsp; &nbsp;<Link className='logout' to='' onClick={handleLogOut}>LOG OUT</Link>
    </nav>
  );
}