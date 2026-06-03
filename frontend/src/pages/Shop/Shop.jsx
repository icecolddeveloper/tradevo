import { getCategoryItems } from '../../data/mockProducts';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './Shop.module.css';
import ProductCard from '../../ui/ProductCard/ProductCard';
import FilterIcon from '../../ui/icons/common/FilterIcon';

const ITEMS_PER_PAGE = 20;

function sortProducts(categoryItems, sortBy) {
  switch (sortBy) {
    case 'newest': {
      return [...categoryItems].sort((a, b) => b.createdAt - a.createdAt); // timestamp difference
    }

    case 'price-asc': {
      return [...categoryItems].sort((a, b) => a.price - b.price);
    }

    case 'price-desc': {
      return [...categoryItems].sort((a, b) => b.price - a.price);
    }

    default: {
      return [...categoryItems];
    }
  }
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

function Shop() {
  const [isLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const category = searchParams.get('category') || '';

  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category?.slice(1);

  const categoryItems = getCategoryItems(category);

  const sorted = sortProducts(categoryItems, sortBy);

  return (
    <div className={styles.shop}>
      <div className="container">
        {/* Page header */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>
              {!category || category === 'all'
                ? 'All Products'
                : capitalizedCategory}
            </div>

            <p className={styles.count}>
              {isLoading ? '—' : `${categoryItems.length} products`}
            </p>
          </div>
        </div>

        <div className={styles.header__actions}>
          {/* Mobile filter toggle */}
          <button className={styles.filter_toggle}>
            <FilterIcon size={20} /> Filters
          </button>

          {/* Sort */}
          <select
            className={styles.sort_select}
            value={sortBy}
            onChange={(e) => setSearchParams({ sort: e.target.value })}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.grid}>
          {sorted.map((prodObj) => (
            <ProductCard key={prodObj.id} productObj={prodObj} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
