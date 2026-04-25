import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.css';

function CategoriesItem({ categoryObj, handleClose }) {
  return (
    <Link
      to={categoryObj.id === 'all' ? '/shop' : `/shop/${categoryObj.id}`}
      className={styles.drawer__category_link}
      onClick={() => handleClose()}
    >
      <span>{categoryObj.icon}</span>
      <span>{categoryObj.label}</span>
    </Link>
  );
}

export default CategoriesItem;
