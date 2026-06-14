import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';

function DropdownLink({ catItem, activeId }) {
  const catItemToLower = catItem.toLowerCase();

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(activeId)}&subcategory=${encodeURIComponent(catItemToLower)}`}
      className={styles.dropdown__link}
    >
      <span className={styles.dropdown__dot}></span>
      {catItem}
    </Link>
  );
}

export default DropdownLink;
