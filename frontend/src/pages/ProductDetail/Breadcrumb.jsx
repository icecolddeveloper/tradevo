import { Link } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import NextArrow from '../../ui/icons/common/NextArrow';

function Breadcrumb({ categoryLabel }) {
  return (
    <nav className={styles.breadcrumb}>
      <div className={styles.breadcrumb__group}>
        <Link to="/" className={styles.breadcrumb__link}>
          Home
        </Link>

        <NextArrow className={styles.next__arrow} size={15} />
      </div>

      <div className={styles.breadcrumb__group}>
        <Link to="/shop" className={styles.breadcrumb__link}>
          Shop
        </Link>

        <NextArrow className={styles.next__arrow} size={15} />
      </div>

      <div className={styles.breadcrumb__group}>
        <Link to={`/shop/${categoryLabel}`} className={styles.breadcrumb__link}>
          {categoryLabel}
        </Link>
      </div>
    </nav>
  );
}

export default Breadcrumb;
