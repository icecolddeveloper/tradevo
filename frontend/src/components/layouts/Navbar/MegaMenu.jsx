import { Link } from 'react-router-dom';
import styles from './MegaMenu.module.css';

function MegaMenu({ categories, onClose }) {
  return (
    <div className={styles.megamenu__wrapper}>
      {
        <div className={styles.megamenu__inner}>
          <p className={styles.megamenu__label}>Browse Categories</p>

          <div className={styles.megamenu__grid}>
            {categories.map((categoryObj) => (
              <MegaMenuItem
                key={categoryObj.id}
                categoryObj={categoryObj}
                onClose={onClose}
              />
            ))}
          </div>

          <div className={styles.megamenu__footer}>
            <Link to="shop" className={styles.megamenu__all_link}>
              View all products →
            </Link>
          </div>
        </div>
      }
    </div>
  );
}

function MegaMenuItem({ categoryObj, onClose }) {
  return (
    <Link
      to={`/shop/${categoryObj.id}`}
      className={styles.megamenu__item}
      onClick={onClose}
    >
      <span className={styles.megamenu__item__icon}>{categoryObj.icon}</span>
      <span className={styles.megamenu__item__label}>{categoryObj.label}</span>
    </Link>
  );
}

export default MegaMenu;
