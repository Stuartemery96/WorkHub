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
      <Link to="/">Transactions</Link>
      &nbsp; | &nbsp;
      <Link to="/clients">Clients</Link>
      &nbsp; &nbsp;<span>Welcome, {user.name}</span>
      &nbsp; &nbsp;<Link className='logout' to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}