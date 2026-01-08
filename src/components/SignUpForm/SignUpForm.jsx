// SignUpForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

import styles from './SignUpForm.module.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });
  const { setUser } = useContext(UserContext);

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const user = await authService.signUp(formData)
    setUser(user); // this line will print the form data to the console
    navigate('/')
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <h2 className={styles.title}>Sign Up</h2>
          <p className={styles.message}>{message}</p>

          <div className={styles.inputField}>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className={styles.inputField}>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className={styles.inputField}>
            <input
              type="password"
              id="confirm"
              name="passwordConf"
              value={passwordConf}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirm">Confirm Password</label>
          </div>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isFormInvalid()}
          >
            Sign Up
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate('/')}
          >
            Cancel
          </button>

          <div className={styles.register}>
            <p>
              Already have an account? <a href="/sign-in">Log in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
