import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

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
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/pokemon/mycards'>MyCards</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          <li><Link to='/pokemon'>All pokemons</Link></li>
          <li><Link to='/pokemon/create'>Add a Card</Link></li>
          <li><Link to='/tradeOffer'>All Trade Offers</Link></li>
          <li><Link to='/tradeOffer/create'>Add Trade Offers</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
          <li><Link to='/pokemon'>All pokemons</Link></li>
          <li><Link to='/tradeOffer'>All Trade Offers</Link></li>
          <li><Link to='/tradeOffer/create'>Add Trade Offers</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
