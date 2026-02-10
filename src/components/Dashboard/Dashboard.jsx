import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as testService from '../../services/testService';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await testService.test();
        setMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      fetchTest();
    } else {
      
      setMessage('');
    }
  }, [user]);

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
            Welcome to your Pokémon Trading HomePage. Here you can manage your Pokémon cards,
            build your personal collection, and trade with other trainers.
          </p>

          <p className={styles.text}>
            Add new Pokémon cards, update your existing ones, and explore trade offers from
            other players. Every card matters — build the ultimate collection.
          </p>

          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
