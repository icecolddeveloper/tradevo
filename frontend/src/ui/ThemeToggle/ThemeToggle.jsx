import { useTheme } from '../../context/ThemeContext';
import DarkIcon from '../icons/theme/DarkIcon';
import LightIcon from '../icons/theme/LightIcon';
import SystemIcon from '../icons/theme/SystemIcon';
import styles from './ThemeToggle.module.css';

const THEMES = ['light', 'system', 'dark'];

function ThemeToggle({ showLabel = false }) {
  const { theme, dispatch } = useTheme();

  function cycleTheme() {
    if (theme === 'light') dispatch({ type: 'SET_THEME', payload: 'dark' });
    else if (theme === 'dark')
      dispatch({ type: 'SET_THEME', payload: 'system' });
    else dispatch({ type: 'SET_THEME', payload: 'light' });
  }

  return (
    <button
      className={styles.theme__toggle}
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}`}
    >
      {/* Only one icon is rendered */}
      {theme === 'light' && <LightIcon className={styles.theme__icon} />}
      {theme === 'dark' && <DarkIcon className={styles.theme__icon} />}
      {theme === 'system' && <SystemIcon className={styles.theme__icon} />}

      {/* Label */}
      {showLabel && <span className={styles.theme__label}>{theme}</span>}
    </button>
  );
}

export default ThemeToggle;
