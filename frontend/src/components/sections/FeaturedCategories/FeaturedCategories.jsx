import { Link } from 'react-router-dom';
import { CATEGORY_DATA } from '../../../data/featuredCategory';
import styles from './FeaturedCategories.module.css';
import ArrowDown from '../../../ui/icons/common/ArrowDown';

function FeaturedCategories() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Browse by category</h2>

          <Link to="/shop" className={styles.view__all}>
            View all →
          </Link>
        </div>

        <div className={styles.tray__wrapper}>
          <div className={styles.track}>
            {CATEGORY_DATA.map((catObj) => (
              <CategoryItem key={catObj.id} catObj={catObj} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryItem({ catObj }) {
  const IconName = catObj.icon;

  return (
    <div className={styles.category__item}>
      <div className={styles.category__item__wrapper}>
        <IconName className={styles.category__icon} />

        <ArrowDown />
      </div>
    </div>
  );
}

export default FeaturedCategories;
