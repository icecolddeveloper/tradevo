import { Link, NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.css';
import CloseIcon from '../../../ui/icons/navigation/CloseIcon';
import ChevronDownIcon from '../../../ui/icons/navigation/ChevronDownIcon';
import CartIcon from '../../../ui/icons/navigation/CartIcon';
import SignOutIcon from '../../../ui/icons/navigation/SignOutIcon';
import { useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
];

const drawerVariant = {
  hidden: { x: '100%' } /* From: 0(start) - 100%(end) */,
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

function MobileMenu({
  categories,
  onClose,
  user = 'Martins Jay',
  isOpen,
  isAuthenticated = true,
}) {
  // Actual state
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);

  // Handle Close
  function handleClose() {
    categoriesExpanded && setCategoriesExpanded(!categoriesExpanded);
    onClose();
  }

  return (
    isOpen && (
      <>
        {/* Backdrop/Overlay */}
        <div className={styles.overlay} />

        {/* Drawer */}
        <motion.div
          className={styles.drawer}
          variants={drawerVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className={styles.drawer__header}>
            <span className={styles.drawer__logo}>Tradevo</span>

            <button
              className={styles.drawer__close}
              onClick={handleClose}
              aria-label="Close menu"
            >
              {/* Close drawer SVG */}
              <CloseIcon />
            </button>
          </div>

          {/* Auth row */}
          {isAuthenticated ? (
            <div className={styles.drawer__user}>
              <div className={styles.drawer__user__avatar}>
                {user?.charAt(0).toUpperCase()}
              </div>

              <div className={styles.drawer__user__info}>
                <p className={styles.drawer__user__name}>{user}</p>
                <p className={styles.drawer__user__mail}>matt@email.com</p>
              </div>
            </div>
          ) : (
            <div className={styles.drawer__auth__btns}>
              {/* Sign In */}
              <Link
                to="/login"
                className={styles.drawer__btn_primary}
                onClick={handleClose}
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className={styles.drawer__btn_ghost}
                onClick={handleClose}
              >
                Register
              </Link>
            </div>
          )}

          {/* Nav Items */}
          <nav className={styles.drawer__nav}>
            {/* Home & Shop */}
            {navItems.map((navItemObj) => (
              <NavItem
                key={navItemObj.to}
                navItemObj={navItemObj}
                onClose={onClose}
              />
            ))}

            {/* Categories */}
            <div>
              <button
                className={styles.drawer__accordion_trigger}
                onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              >
                {/* Label */}
                <span>Categories</span>

                {/* Chevron icon */}
                <ChevronDownIcon />
              </button>

              {/* Mega menu dropdown */}
              {categoriesExpanded && (
                <div>
                  <div className={styles.drawer__categories__container}>
                    {categories.map((categoryObj) => (
                      <CategoriesItem
                        key={categoryObj.id}
                        categoryObj={categoryObj}
                        onClose={handleClose}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Available for authenticated */}
            {isAuthenticated && (
              <div className={styles.my__account__actions}>
                {/* My Account */}
                <div>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `${styles.drawer__link} ${isActive ? styles.drawer__link__active : ''}`
                    }
                    onClick={handleClose}
                  >
                    My Account
                  </NavLink>
                </div>

                {/* My Orders */}
                <div>
                  <NavLink
                    to="/dashboard/orders"
                    end
                    className={({ isActive }) =>
                      `${styles.drawer__link} ${isActive ? styles.drawer__link__active : ''}`
                    }
                    onClick={handleClose}
                  >
                    My Orders
                  </NavLink>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className={styles.drawer__footer}>
              {/* View Cart */}
              <Link
                to="/cart"
                className={styles.drawer__cart_btn}
                onClick={handleClose}
              >
                <CartIcon size={20} />
                View Cart
                {[].length > 0 && (
                  <span className={styles.drawer__cart_badge}>{5}</span>
                )}
              </Link>

              {/* Sign Out */}
              {isAuthenticated && (
                <button
                  className={styles.drawer__logout_btn}
                  onClick={handleClose}
                >
                  <SignOutIcon size={20} />
                  Sign Out
                </button>
              )}
            </div>
          </nav>
        </motion.div>
      </>
    )
  );
}

function NavItem({ navItemObj, onClose }) {
  return (
    <div>
      <NavLink
        to={navItemObj.to}
        end={navItemObj.to === '/'}
        className={({ isActive }) =>
          `${styles.drawer__link} ${isActive ? styles.drawer__link__active : ''}`
        }
        onClick={() => onClose()}
      >
        {navItemObj.label}
      </NavLink>
    </div>
  );
}

function CategoriesItem({ categoryObj, onClose }) {
  return (
    <Link
      to={categoryObj.id === 'all' ? '/shop' : `/shop/${categoryObj.id}`}
      className={styles.drawer__category_link}
      onClick={() => onClose()}
    >
      <span>{categoryObj.icon}</span>
      <span>{categoryObj.label}</span>
    </Link>
  );
}

export default MobileMenu;
