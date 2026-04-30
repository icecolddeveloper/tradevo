import { useState } from 'react';
import { formFields } from '../../data/formFields';
import Logo from '../../ui/Logo/Logo';
import FieldWrapper from './FieldWrapper';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({ password: false, email: false });
  // const [errors, setErrors] = useState({ password: true, email: true });

  return (
    <div className={styles.page__container}>
      <div className={styles.card}>
        {/* Title + Sub */}
        <div className={styles.card__header}>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtext}>Join millions of shoppers on Tradevo</p>
        </div>

        <form className={styles.form__container}>
          {formFields.map((fieldObj) => (
            <FieldWrapper
              key={fieldObj.id}
              fieldObj={fieldObj}
              form={form}
              setForm={setForm}
              showPassword={showPassword}
              confirm={showPassword}
              setShowPassword={setShowPassword}
            />
          ))}

          <button type="submit" className={styles.submit_btn}>
            Create Account
          </button>

          <div className={styles.footer__wrapper}>
            <p className={styles.footer_text}>Already have an account?</p>

            <Link to="/login" className={styles.footer_link}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
