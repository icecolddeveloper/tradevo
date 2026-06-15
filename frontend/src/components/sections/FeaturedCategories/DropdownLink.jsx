import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';

function DropdownLink({ catItemObj, activeId }) {
  const catItemToLower = catItemObj.id.toLowerCase();

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(activeId)}&subcategory=${encodeURIComponent(catItemToLower)}`}
      className={styles.dropdown__link}
    >
      <span className={styles.dropdown__dot}></span>
      {catItemObj.label}
    </Link>
  );
}

export default DropdownLink;
