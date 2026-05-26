import { useParams } from 'react-router-dom';
import styles from './Shop.module.css';

function Shop() {
  const { category } = useParams(); // e.g. electronics

  const capitalizedCategory =
    category?.charAt(0).toUpperCase() + category?.slice(1);

  console.log(capitalizedCategory);
  // const filteredCategory = getCategoryItems(category);

  return (
    <div className={styles.shop} style={{ margin: '3rem 0rem' }}>
      <div className="container">
        {/* Page header */}
        <div className={styles.title}>
          {!category || category === 'all'
            ? 'All Products'
            : capitalizedCategory}
        </div>
      </div>
    </div>
  );
}

export default Shop;
