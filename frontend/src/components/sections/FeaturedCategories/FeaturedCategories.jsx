import { Link } from 'react-router-dom';
import { CATEGORY_DATA } from '../../../data/featuredCategory';
import styles from './FeaturedCategories.module.css';
import ArrowDown from '../../../ui/icons/common/ArrowDown';
import { useState } from 'react';

function FeaturedCategories() {
  const [activeId, setActiveId] = useState('electronics');
  const activeCategoryObj = CATEGORY_DATA.find(
    (catObj) => catObj.id === activeId,
  );

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
          {/* Category Title */}
          <div className={styles.track}>
            {CATEGORY_DATA.map((catObj) => (
              <CategoryItem key={catObj.id} catObj={catObj} />
            ))}
          </div>

          {/* Dropdown */}
          <div className={styles.dropdown__wrapper}>
            {/* Dropdown Inner */}
            <div className={styles.dropdown__inner}>
              {/* Dropdown links */}
              <div className={styles.dropdown__links}>
                {/* Heading title */}
                <p className={styles.dropdown__heading}>Subcategories</p>

                {/* Dropdown links */}
                {activeCategoryObj.items.map((catItem) => (
                  <DropdownLink key={catItem} catItem={catItem} />
                ))}
              </div>

              {/* Dropdown card */}
              <div className={styles.dropdown__card}>
                <p className={styles.dropdown__card__eye}>
                  {activeCategoryObj.label}
                </p>
                <p className={styles.dropdown__card__name}>
                  {activeCategoryObj.featured.name}
                </p>
                <span className={styles.dropdown__card__badge}>
                  {activeCategoryObj.featured.discount}
                </span>

                {/* Link */}
                <Link to={``} className={styles.card__cta}>
                  Shop {activeCategoryObj.label}{' '}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DropdownLink({ catItem }) {
  return (
    <Link to={``} className={styles.dropdown__link}>
      <span className={styles.dropdown__dot}></span>
      {catItem}
    </Link>
  );
}

function CategoryItem({ catObj }) {
  const IconName = catObj.icon;

  return (
    <div className={styles.category__item}>
      <div className={styles.category__item__wrapper}>
        {/* <IconName className={styles.category__icon} size={20} /> */}
        <span>{catObj.label}</span>

        <ArrowDown />
      </div>
    </div>
  );
}

export default FeaturedCategories;
