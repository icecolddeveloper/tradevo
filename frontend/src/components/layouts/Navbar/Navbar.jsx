import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className={styles.navbar}>
      {/* Navbar Inner */}
      <div className={styles.navbar__inner}>
        {/* Logo */}
        <Link to="/" className={styles.navbar__logo}>
          <span className={styles.navbar__logo__mark}>T</span>
          <span className={styles.navbar__logo__word}>radevo</span>
        </Link>

        {/* Desktop Links */}

        {/* Search Bar */}

        {/* Right Icons */}
      </div>
    </header>
  );
}

export default Navbar;
