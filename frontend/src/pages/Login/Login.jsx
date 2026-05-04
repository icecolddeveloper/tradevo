import { Link, Links } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Login.module.css';
import EmailIcon from '../../ui/icons/Auth/EmailIcon';
import PasswordInput from '../../ui/PasswordInput/PasswordInput';
import useForm from '../../hooks/useForm';

function Login() {
  const { form, showPassword, errors, handleChange, handleIconToggle } =
    useForm({
      initialValues: {
        email: '',
        password: '',
      },
    });

  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div className={styles.page__container}>
      <motion.div
        className={styles.card}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title + Sub */}
        <div className={styles.card__header}>
          <div className={styles.title}>Welcome back</div>
          <p className={styles.subtext}>Sign in to your Tradevo account</p>
        </div>

        <form className={styles.form__container} noValidate>
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
                value={form.email}
                onChange={handleChange}
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

            <PasswordInput
              id="password"
              type={`${showPassword.password ? 'text' : 'password'}`}
              className={`${styles.input} ${errors.password ? styles.input__error : ''}`}
              placeholder="••••••••"
              value={form.password}
              handleChange={handleChange}
              showPassword={showPassword.password}
              handleIconToggle={(e) => handleIconToggle(e, false, 'password')}
            />

            {/* Error */}
            {errors.password && (
              <p className={styles.field_error}>{'Password err msg'}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submit_btn}
            onClick={(e) => e.preventDefault()}
          >
            Sign In
          </button>

          <div className={styles.footer__wrapper}>
            <p className={styles.footer_text}>Don't have an account?</p>

            <Link to="/register" className={styles.footer_link}>
              Create one
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
