import EyeCloseIcon from '../icons/Auth/EyeCloseIcon';
import EyeOpenIcon from '../icons/Auth/EyeOpenIcon';
import LockIcon from '../icons/Auth/LockIcon';
import styles from './PasswordInput.module.css';

function PasswordInput({
  id,
  type,
  className,
  placeholder,
  value,
  autoComplete,
  handleChange,
  showPassword,
  handleBlur,
  handleIconToggle,
}) {

  return (
    <div className={styles.input__wrapper}>
      <LockIcon className={styles.field__icon} />

      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={autoComplete}
      />

      {/* Eye icon */}
      <button
        type="button"
        className={styles.eye__icon__wrapper}
        onClick={handleIconToggle}
      >
        {showPassword ? <EyeCloseIcon size={20} /> : <EyeOpenIcon size={20} />}
      </button>
    </div>
  );
}

export default PasswordInput; // Both register & Login
