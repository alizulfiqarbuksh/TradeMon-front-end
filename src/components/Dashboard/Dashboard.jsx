import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as testService from '../../services/testService';

import styles from './Dashboard.module.css'


const Dashboard = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);

  // Create state to store the message we'll receive from the backend
  const [ message, setMessage ] = useState('');

  // useEffect runs after the component renders
  // This is where we perform side effects like API calls
  useEffect(() => {
    const fetchTest = async () => {
      try {
        // Make an authenticated API call to the backend test endpoint. The JWT token is automatically sent in the request headers inside the service function
        const data = await testService.test();

        // Take the response data and show message
        setMessage(data.message);
      } catch (err) {
        console.log(err)
      }
    }

    // Only fetch data if user exists (i.e., someone is logged in)
    // This prevents errors from trying to make authenticated requests without a user
    if (user) fetchTest();

  }, [user]); // only fetch if after context loads the user from localStorage

  return (
    <div className={styles.page}>
      <div className={styles.main}>

        {/* LEFT IMAGE */}
        <div className={styles.image}></div>

        {/* RIGHT CONTENT */}
        <div className={styles.content}>
          <h1 className={styles.title}>
             Welcome, {user ? user.username : 'Guest'}
          </h1>

          <p className={styles.text}>
            Welcome to your Pokémon Trading HomePage.
            Here you can manage your Pokémon cards, build your personal collection,
            and trade with other trainers.
          </p>

          <p className={styles.text}>
            Add new Pokémon cards, update your existing ones,
            and explore trade offers from other players.
            Every card matters — build the ultimate collection.
          </p>

          {message && (
            <p className={styles.message}>{message}</p>
          )}
        </div>

      </div>
    </div>
  )
};

export default Dashboard;
