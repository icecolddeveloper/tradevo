import PasswordInput from '../../ui/PasswordInput/PasswordInput';
import styles from './FieldWrapper.module.css'

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
        // Name & Email
        <input
          id={fieldObj.id}
          type={fieldObj.type}
          placeholder={fieldObj.placeholder}
          className={styles.input}
          value={form[fieldObj.id]}
          onChange={(e) => setForm({ ...form, [fieldObj.id]: e.target.value })}
        />
      ) : (
        // Password & confirm PW
        <PasswordInput
          id={fieldObj.id}
          type={`${showPassword[fieldObj.id] ? 'text' : 'password'}`}
          className={styles.input}
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
