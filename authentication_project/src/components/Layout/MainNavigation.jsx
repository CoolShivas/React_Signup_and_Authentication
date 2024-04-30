
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/Auth-Context';

const MainNavigation = () => {

  const {isLoggedIn} = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {/* Making the LogIn link dynamic with conditions. If LogIn not then show the LogIn Link. */}
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}

          {/* Making the Profile link dynamic with conditions. If LogIn then show Profile Link. */}
          {isLoggedIn &&  <li>
            <Link to='/profile'>Profile</Link>
          </li>}
         
         {/* Making the Logout link dynamic with conditions. If LogIn then show the LogOut Link. */}
         {isLoggedIn &&  <li>
            <button>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
