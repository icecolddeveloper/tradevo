import { Link, Links } from 'react-router-dom';
import styles from './Login.module.css';
import { useState } from 'react';
import EmailIcon from '../../ui/icons/Auth/EmailIcon';
import LockIcon from '../../ui/icons/Auth/LockIcon';
import EyeIcon from '../../ui/icons/Auth/EyeIcon';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ password: false, email: false });
  // const [errors, setErrors] = useState({ password: true, email: true });

  return (
    <div className={styles.page__container}>
      <div className={styles.card}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logo__special}>T</span>
          <span>radevo</span>
        </Link>

        {/* Title + Sub */}
        <div className={styles.card__header}>
          <div className={styles.title}>Welcome back</div>
          <p className={styles.subtext}>Sign in to your Tradevo account</p>
        </div>

        <form className={styles.form__container}>
          <div className={styles.field__wrapper}>
            {/* Label */}
            <label htmlFor="email" className={styles.label}>
              Email
            </label>

            {/* Input wrapper */}
            <div className={styles.input__wrapper}>
              {/* Mail icon */}
              <EmailIcon className={styles.field__icon} />

              {/* Input */}
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.input__error : ''}`}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Error */}
            {errors.email && (
              <p className={styles.field_error}>{'Email err msg'}</p>
            )}
          </div>

          <div className={styles.field__wrapper}>
            {/* Label */}
            <label htmlFor="password" className={styles.label}>
              Password
            </label>

            {/* Input wrapper */}
            <div className={styles.input__wrapper}>
              {/* Mail icon */}
              <LockIcon className={styles.field__icon} />

              {/* Password */}
              <input
                id="password"
                type="password"
                className={`${styles.input} ${errors.password ? styles.input__error : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Eye icon */}
              <EyeIcon className={styles.eye__icon} />
            </div>

            {/* Error */}
            {errors.password && (
              <p className={styles.field_error}>{'Password err msg'}</p>
            )}
          </div>

          <button type="submit" className={styles.submit_btn}>
            Sign In
          </button>

          <div className={styles.footer__wrapper}>
            <p className={styles.footer_text}>Don't have an account?</p>

            <Link to="/register" className={styles.footer_link}>
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
