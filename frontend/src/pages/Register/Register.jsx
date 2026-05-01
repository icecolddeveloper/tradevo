import { formFields } from '../../data/formFields';
import Logo from '../../ui/Logo/Logo';
import FieldWrapper from './FieldWrapper';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { motion } from 'framer-motion';

function Register() {
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

        <form className={styles.form__container} noValidate>
          {formFields.map((fieldObj) => (
            <FieldWrapper
              key={fieldObj.id}
              fieldObj={fieldObj}
              form={form}
              errors={errors}
              showPassword={showPassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleIconToggle={handleIconToggle}
            />
          ))}

          <button
            type="submit"
            className={styles.submit_btn}
            onClick={(e) => e.preventDefault()}
          >
            Create Account
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
