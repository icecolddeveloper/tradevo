import { Link, NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../../data/mockProducts';
import styles from './Navbar.module.css';
import MegaMenu from './MegaMenu';
import SearchIcon from '../../../ui/icons/navigation/SearchIcon';
import ChevronDownIcon from '../../../ui/icons/navigation/ChevronDownIcon';
import ThemeToggle from '../../../ui/ThemeToggle/ThemeToggle';
import HeartIcon from '../../../ui/icons/navigation/HeartIcon';
import CartIcon from '../../../ui/icons/navigation/CartIcon';
import MobileMenu from './MobileMenu/MobileMenu';
import Logo from '../../../ui/Logo/Logo';
import { useCart } from '../../../context/cartContext';

function Navbar() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('Martins');
  const { totalItems } = useCart();

  // Actual State
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaTimerRef = useRef(null);

  const wishListCount = 10;

  function handleCategoryEnter() {
    clearTimeout(megaTimerRef.current);
    setMegaMenuOpen(true);
  }

  function handleCategoryLeave() {
    megaTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  }

  return (
    <header className={styles.navbar}>
      {/* ---- Navbar Inner (Relative Horizontal) ------ */}
      <div className={styles.navbar__inner}>
        {/* ---- Logo ------- */}
        <Logo />

        {/* ----  Desktop Links  ---------------------------------- */}
        <nav className={styles.navbar__nav}>
          {/* ---- Home ---- */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navbar__link} ${isActive ? styles.navbar__link__active : ''}`
            }
          >
            Home
          </NavLink>

          {/* ---- Categories with mega menu --------- */}
          <div
            className={styles.navbar__categories}
            onMouseEnter={handleCategoryEnter}
            onMouseLeave={handleCategoryLeave}
            ref={megaTimerRef}
          >
            <button
              className={`${styles.navbar__link} ${megaMenuOpen ? styles.navbar__link__active : ''}`}
            >
              Categories
              <ChevronDownIcon
                className={`${styles.chevron} ${megaMenuOpen ? styles.chevron__open : ''}`}
              />
            </button>

            {/* ---- Dropdown menu --------- */}
            <AnimatePresence>
              {megaMenuOpen && (
                <MegaMenu
                  categories={CATEGORIES.filter(
                    (categoryObj) => categoryObj.id !== 'all',
                  )}
                  onMouseEnter={handleCategoryEnter}
                  onMouseLeave={handleCategoryLeave}
                  onClose={() => setMegaMenuOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* ---- Shop ------------------- */}
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${styles.navbar__link} ${isActive ? styles.navbar__link__active : ''}`
            }
          >
            Shop
          </NavLink>
        </nav>

        {/* ---- Search Bar --------------- */}
        <form
          className={`${styles.navbar__search} ${searchFocused ? styles.navbar__search__focused : ''}`}
        >
          <input
            type="text"
            placeholder="Search products..."
            className={styles.navbar__search__input}
          />

          <SearchIcon className={styles.navbar__search__icon} />
        </form>

        {/* ----  Right Icons  -------- */}
        <div className={styles.navbar__actions}>
          {/* ---- Theme toggle ------- */}
          <ThemeToggle showLabel={false} />

          {/* ---- Wishlist ----------- */}
          <Link
            to="/dashboard/wishlist"
            className={styles.navbar__icon_btn}
            aria-label="Wishlist"
          >
            <HeartIcon />

            {[].length > 0 && (
              /* ---- WishlistCount----- */
              <span className={styles.navbar__badge}>{totalItems}</span>
            )}
          </Link>

          {/* ---- Cart ---------------- */}
          <Link
            to="/cart"
            className={styles.navbar__icon_btn}
            aria-label="Shopping cart"
          >
            <CartIcon />

            {totalItems > 0 && (
              /* ---- CartCount-----  */
              <span className={styles.navbar__badge}>{totalItems}</span>
            )}
          </Link>

          {/* ---- Auth ------------------ */}
          {isAuthenticated ? (
            <Link to="/dashboard" className={styles.navbar__avatar}>
              {user?.name?.charAt(0).toUpperCase() || 'M'}
            </Link>
          ) : (
            <Link to="/login" className={styles.navbar__auth_btn}>
              Sign in
            </Link>
          )}

          {/* ---- Mobile Hamburger ----------------------- */}
          <button
            className={styles.navbar__hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* ---- Mobile Menu (Absolute Vertical) --------- */}
      <MobileMenu
        categories={CATEGORIES}
        onClose={() => setMobileOpen(!mobileOpen)}
        isOpen={mobileOpen}
      />
    </header>
  );
}

export default Navbar;
