import EmailIcon from '../../ui/icons/Auth/EmailIcon';
import UserIcon from '../../ui/icons/Auth/UserIcon';
import PasswordInput from '../../ui/PasswordInput/PasswordInput';
import styles from './FieldWrapper.module.css';

function FieldWrapper({
  fieldObj,
  form,
  setForm,
  showPassword,
  setShowPassword,
}) {
  function handleToggle() {
    setShowPassword((prev) => ({ ...prev, [fieldObj.id]: !prev[fieldObj.id] }));
  }

  return (
    <div className={styles.field__wrapper}>
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
        // Name & Email
        <div className={styles.input__wrapper}>
          <input
            id={fieldObj.id}
            type={fieldObj.type}
            placeholder={fieldObj.placeholder}
            className={styles.input}
            value={form[fieldObj.id]}
            onChange={(e) =>
              setForm({ ...form, [fieldObj.id]: e.target.value })
            }
          />

          {fieldObj.id === 'name' && <UserIcon className={styles.field__icon} />}
          {fieldObj.id === 'email' && <EmailIcon className={styles.field__icon} />}
        </div>
      ) : (
        // Password & confirm PW
        <PasswordInput
          id={fieldObj.id}
          type={`${showPassword[fieldObj.id] ? 'text' : 'password'}`}
          className={styles.input}
          placeholder={fieldObj.placeholder}
          value={form[fieldObj.id]}
          onChange={(e) => setForm({ ...form, [fieldObj.id]: e.target.value })}
          showPassword={showPassword[fieldObj.id]}
          setShowPassword={handleToggle}
        />
      )}
    </div>
  );
}

export default FieldWrapper;
