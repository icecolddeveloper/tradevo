import EyeCloseIcon from '../../../ui/icons/Auth/EyeCloseIcon';
import EyeOpenIcon from '../../../ui/icons/Auth/EyeOpenIcon';
import LockIcon from '../../../ui/icons/Auth/LockIcon';
import styles from './PasswordInput.module.css';

function PasswordInput({
  id,
  type,
  className,
  placeholder,
  value,
  autoComplete,
  onChange,
  showPassword,
  setShowPassword,
}) {
  console.log(showPassword);
  function handleIconToggle(e) {
    e.preventDefault();
    setShowPassword();
  }

  return (
    <div className={styles.input__wrapper}>
      <LockIcon className={styles.field__icon} />

      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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

export default PasswordInput;
