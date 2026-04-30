import { useState } from 'react';
import { formFields } from '../../data/formFields';
import Logo from '../../ui/Logo/Logo';
import FieldWrapper from './FieldWrapper';
import styles from './Register.module.css';

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

  return (
    <div className={styles.page__container}>
      <div className={styles.card}>
        {/* Logo */}
        <Logo />

        {/* Title + Sub */}
        <div className={styles.card__header}>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtext}>Join millions of shoppers on Tradevo</p>
        </div>

        <div className={styles.form__container}>
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
        </div>
      </div>
    </div>
  );
}

export default Register;
