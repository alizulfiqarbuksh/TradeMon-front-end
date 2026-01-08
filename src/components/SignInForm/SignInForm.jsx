import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';
import styles from './SignInForm.module.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className={styles.signin}>
      <div className={styles.signinWrapper}>
        <form className={styles.signinForm} autoComplete="off" onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          {message && <p className={styles.signinMessage}>{message}</p>}

          <div className={styles.signinInputField}>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className={styles.signinInputField}>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className={styles.signinButton}>
            Sign In
          </button>
          <button
            type="button"
            className={styles.signinButton}
            onClick={() => navigate('/')}
          >
            Cancel
          </button>

          <div className={styles.signinRegister}>
            <p>
              Don't have an account? <a href="/sign-up">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
