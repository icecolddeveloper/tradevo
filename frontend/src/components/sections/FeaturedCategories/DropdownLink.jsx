import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';

function DropdownLink({ catItem }) {
  return (
    <Link to={`shop/${catItem.id}`} className={styles.dropdown__link}>
      <span className={styles.dropdown__dot}></span>
      {catItem}
    </Link>
  );
}

export default DropdownLink;
