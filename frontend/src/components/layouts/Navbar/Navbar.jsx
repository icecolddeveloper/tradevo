import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { CATEGORIES } from '../../../data/mockProducts';
import styles from './Navbar.module.css';
import MegaMenu from './MegaMenu';

function Navbar() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState('Martins');

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
        <nav className={styles.navbar__nav}>
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navbar__link} ${isActive ? styles.navbar__link__active : ''}`
            }
          >
            Home
          </NavLink>

          {/* Categories with mega menu */}
          <div className={styles.navbar__categories}>
            <button
              className={`${styles.navbar__link} ${megaMenuOpen ? styles.navbar__link__active : ''}`}
            >
              Categories {/* svg here */}
            </button>

            {/* Dropdown menu */}
            {megaMenuOpen && (
              <MegaMenu
                categories={CATEGORIES.filter(
                  (categoryObj) => categoryObj.id !== 'all',
                )}
              />
            )}
          </div>

          {/* Shop */}
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${styles.navbar__link} ${isActive ? styles.navbar__link__active : ''}`
            }
          >
            Shop
          </NavLink>
        </nav>

        {/* Search Bar */}
        <form
          className={`${styles.navbar__search} ${searchFocused ? styles.navbar__search__focused : ''}`}
        >
          {/* svg here */}
          <input
            type="text"
            placeholder="Search products..."
            className={styles.navbar__search__input}
          />
        </form>

        {/* Right Icons */}
        <div className={styles.navbar__actions}>
          {/* Theme toggle */}

          {/* Wishlist */}
          <Link
            to="/dashboard/wishlist"
            className={styles.navbar__icon__btn}
            aria-label="Wishlist"
          >
            {/* svg here */}

            {[].length > 0 &&
              {
                /* WishlistCount*/
              }}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={styles.navbar__icon__btn}
            aria-label="Shopping cart"
          >
            {/* svg here */}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <Link to="/dashboard" className={styles.navbar__avatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Link>
          ) : (
            <Link to="/login" className={styles.navbar__auth_btn}>
              Sign in
            </Link>
          )}

          {/* Mobile Hamburger */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
