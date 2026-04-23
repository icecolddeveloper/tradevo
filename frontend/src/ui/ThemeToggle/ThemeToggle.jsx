import { useState } from 'react';
import DarkIcon from '../icons/theme/DarkIcon';
import LightIcon from '../icons/theme/LightIcon';
import SystemIcon from '../icons/theme/SystemIcon';
import styles from './ThemeToggle.module.css';

const THEMES = ['light', 'system', 'dark'];

function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  function cycleTheme() {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  }

  return (
    <button onClick={cycleTheme} className={styles.theme__toggle} aria-label={`Current theme: ${theme}`}>
      {/* Only one icon is rendered */}
      {theme === 'light' && <LightIcon className={styles.theme__icon} />}
      {theme === 'dark' && <DarkIcon className={styles.theme__icon} />}
      {theme === 'system' && <SystemIcon className={styles.theme__icon} />}

      {/* Label */}
      {/* <span className={styles.theme__label}>{theme}</span> */}
    </button>
  );
}

export default ThemeToggle;
