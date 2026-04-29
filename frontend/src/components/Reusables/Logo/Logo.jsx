import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.logo__special}>T</span>
      <span>radevo</span>
    </Link>
  );
}

export default Logo;
