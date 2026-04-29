import { useState } from 'react';
import Logo from '../../components/Reusables/Logo/Logo';
import PasswordInput from '../../components/Reusables/PasswordInput/PasswordInput';
import styles from './Register.module.css';

const formFields = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'John Michael',
    autocomplete: 'name',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@email.com',
    autocomplete: 'email',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    autocomplete: 'new-password',
  },
  {
    id: 'confirm',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••',
    autocomplete: 'new-password',
  },
];

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
              showPassword={showPassword.password}
              confirm={showPassword.confirm}
              setShowPassword={setShowPassword}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldWrapper({
  fieldObj,
  form,
  setForm,
  showPassword,
  setShowPassword,
}) {
  const isVisible = showPassword[fieldObj.id];

  return (
    <div className={styles.fieldWrapper}>
      {/* Label */}
      <label
        htmlFor={fieldObj.id}
        type={fieldObj.type}
        className={styles.label}
      >
        {fieldObj.label}
      </label>

      {/* Input */}
      {fieldObj.type !== 'password' ? (
        <input
          id={fieldObj.id}
          type={fieldObj.type}
          placeholder={fieldObj.placeholder}
          className={styles.input}
          value={form[fieldObj.id]}
          onChange={(e) => setForm({ ...form, [fieldObj.id]: e.target.value })}
        />
      ) : (
        <PasswordInput
          id={fieldObj.id}
          type={fieldObj.type}
          className={styles.input}
          value={form[fieldObj.id]}
          onChange={(e) => setForm({ ...form, [fieldObj.id]: e.target.value })}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      )}
    </div>
  );
}

export default Register;
