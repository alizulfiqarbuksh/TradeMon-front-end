import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import styles from './NavBar.module.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // The nav bar gets the user from the context which is either
  // {username, _id} if logged in or null if not, and shows
  // set of the correct set of links
  return (
    <nav className={styles.nav}>
      {user ? (
        <ul className={styles.list}>
          <li><Link className={styles.link} to="/">Dashboard</Link></li>
          <li><Link className={styles.link} to="/pokemon/mycards">MyCards</Link></li>
          <li><Link className={styles.link} to="/" onClick={handleSignOut}>Sign Out</Link></li>
          <li><Link className={styles.link} to="/pokemon">All Pokemons</Link></li>
          <li><Link className={styles.link} to="/pokemon/create">Add a Card</Link></li>
          <li><Link className={styles.link} to="/tradeOffer">My Trade Offers</Link></li>
          <li className={styles.item}>Welcome, {user.username}</li>
        </ul>
      ) : (
        <ul className={styles.list}>
          <li><Link className={styles.link} to="/">Dashboard</Link></li>
          <li><Link className={styles.link} to="/sign-in">Sign In</Link></li>
          <li><Link className={styles.link} to="/sign-up">Sign Up</Link></li>
          <li><Link className={styles.link} to="/pokemon">All Pokemons</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
