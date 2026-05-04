import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import { drawerVariant } from './DrawerVariants';
import { itemVariants } from './DrawerVariants';
import { expandedVariants } from './DrawerVariants';

import styles from './MobileMenu.module.css';

import CloseIcon from '../../../../ui/icons/navigation/CloseIcon';
import ChevronDownIcon from '../../../../ui/icons/navigation/ChevronDownIcon';
import CartIcon from '../../../../ui/icons/navigation/CartIcon';
import SignOutIcon from '../../../../ui/icons/navigation/SignOutIcon';
import CategoriesItem from './CategoriesItem';
import NavItem from './NavItem';
import ThemeToggle from '../../../../ui/ThemeToggle/ThemeToggle';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
];

function MobileMenu({
  categories,
  onClose,
  user = 'Martins Jay',
  isOpen,
  isAuthenticated = false,
}) {
  // Actual state
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);

  // Handle Close
  function handleClose() {
    categoriesExpanded && setCategoriesExpanded(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop/Overlay */}
          <div className={styles.overlay} onClick={handleClose} />

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
              {navItems.map((navItemObj, i) => (
                <NavItem
                  idx={i}
                  key={navItemObj.to}
                  navItemObj={navItemObj}
                  onClose={onClose}
                />
              ))}

              {/* Categories */}
              <motion.div
                variants={itemVariants}
                custom={2}
                initial="hidden"
                animate="visible"
              >
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
                <AnimatePresence>
                  {categoriesExpanded && (
                    <motion.div
                      variants={expandedVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className={styles.drawer__categories__container}>
                        {categories.map((categoryObj) => (
                          <CategoriesItem
                            key={categoryObj.id}
                            categoryObj={categoryObj}
                            handleClose={handleClose}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <ThemeToggle showLabel={true} />

              {/* Available for authenticated */}
              {isAuthenticated && (
                <div className={styles.my__account__actions}>
                  {/* My Account */}
                  <motion.div
                    variants={itemVariants}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                  >
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
                  </motion.div>

                  {/* My Orders */}
                  <motion.div
                    variants={itemVariants}
                    custom={4}
                    initial="hidden"
                    animate="visible"
                  >
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
                  </motion.div>
                </div>
              )}

              {/* Footer */}
              <div className={styles.drawer__footer}>
                {/* View Cart */}
                <Link
                  to="/cart"
                  className={
                    isAuthenticated
                      ? styles.drawer__cart_btn_half
                      : styles.drawer__cart_btn_full
                  }
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
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
