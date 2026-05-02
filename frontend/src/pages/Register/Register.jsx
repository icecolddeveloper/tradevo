import { formFields } from '../../data/formFields';
import Logo from '../../ui/Logo/Logo';
import FieldWrapper from './FieldWrapper';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { motion } from 'framer-motion';
import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000/api';

function Register() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const {
    form,
    showPassword,
    errors,
    handleBlur,
    handleChange,
    handleIconToggle,
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    setServerErrors({});
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (res.status === 201) {
        navigate('/login');
        return;
      }

      const data = await res.json().catch(() => ({}));
      const flat = Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
      );
      setServerErrors(flat);
    } catch {
      setServerErrors({ detail: 'Could not reach the server. Try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  const mergedErrors = { ...errors, ...serverErrors };

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
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtext}>Join millions of shoppers on Tradevo</p>
        </div>

        <form
          className={styles.form__container}
          noValidate
          onSubmit={handleSubmit}
        >
          {formFields.map((fieldObj) => (
            <FieldWrapper
              key={fieldObj.id}
              fieldObj={fieldObj}
              form={form}
              errors={mergedErrors}
              showPassword={showPassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleIconToggle={handleIconToggle}
            />
          ))}

          {serverErrors.detail && (
            <p className={styles.field_error}>{serverErrors.detail}</p>
          )}

          <button
            type="submit"
            className={styles.submit_btn}
            disabled={submitting}
          >
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>

          <div className={styles.footer__wrapper}>
            <p className={styles.footer_text}>Already have an account?</p>

            <Link to="/login" className={styles.footer_link}>
              Sign in
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
