import { Link, NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.css';
import CloseIcon from '../../../ui/icons/navigation/CloseIcon';
import ChevronDownIcon from '../../../ui/icons/navigation/ChevronDownIcon';
import CartIcon from '../../../ui/icons/navigation/CartIcon';
import SignOutIcon from '../../../ui/icons/navigation/SignOutIcon';

function MobileMenu({
  categories,
  onClose,
  user = 'Martins Jay',
  isOpen = true,
  isAuthenticated = true,
  categoriesExpanded = true,
}) {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
  ];

  return (
    isOpen && (
      <>
        {/* Backdrop/Overlay */}
        <div className={styles.overlay} />

        {/* Drawer Menu */}
        <div className={styles.drawer}>
          {/* Header */}
          <div className={styles.drawer__header}>
            <span className={styles.drawer__logo}>Tradevo</span>

            <button
              className={styles.drawer__close}
              onClick={onClose}
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
              <Link to="/login" className={styles.drawer__btn_primary}>
                Sign in
              </Link>

              <Link to="/register" className={styles.drawer__btn_ghost}>
                Register
              </Link>
            </div>
          )}

          {/* Categories accordion */}
          <nav className={styles.drawer__nav}>
            {/* Home & Shop */}
            {navItems.map((navItemObj) => (
              <NavItem key={navItemObj.to} navItemObj={navItemObj} />
            ))}

            {/* Categories */}
            <div>
              <button className={styles.drawer__accordion_trigger}>
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
                  >
                    My Orders
                  </NavLink>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className={styles.drawer__footer}>
              {/* View Cart */}
              <Link to="/cart"  className={styles.drawer__cart_btn}>
                <CartIcon size={20}/>
                View Cart
              </Link>

              {/* Sign Out */}
              {isAuthenticated && (
                <button className={styles.drawer__logout_btn}>
                  <SignOutIcon size={20}/>
                  Sign Out
                </button>
              )}
            </div>
          </nav>
        </div>
      </>
    )
  );
}

function NavItem({ navItemObj }) {
  return (
    <div>
      <NavLink
        to={navItemObj.to}
        end={navItemObj.to === '/'}
        className={({ isActive }) =>
          `${styles.drawer__link} ${isActive ? styles.drawer__link__active : ''}`
        }
      >
        {navItemObj.label}
      </NavLink>
    </div>
  );
}

function CategoriesItem({ categoryObj }) {
  return (
    <Link
      to={categoryObj.id === 'all' ? '/shop' : `/shop/${categoryObj.id}`}
      className={styles.drawer__category_link}
    >
      <span>{categoryObj.icon}</span>
      <span>{categoryObj.label}</span>
    </Link>
  );
}

export default MobileMenu;
