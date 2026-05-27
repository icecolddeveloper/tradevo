import { getCategoryItems } from '../../data/mockProducts';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './Shop.module.css';
import ProductCard from '../../ui/ProductCard/ProductCard';
import FilterIcon from '../../ui/icons/common/FilterIcon';

const ITEMS_PER_PAGE = 20;

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

function Shop() {
  const { category } = useParams(); // e.g. electronics
  const [isLoading, setIsLoading] = useState(false);

  const capitalizedCategory =
    category?.charAt(0).toUpperCase() + category?.slice(1);

  const filteredProducts = getCategoryItems(category);
  console.log(filteredProducts);

  // Sort logic
  const [sort, setSort] = useState('newest');

  console.log(sort);
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
              {isLoading ? '—' : `${filteredProducts.length} products`}
            </p>
          </div>

          <div className={styles.header__actions}>
            {/* Mobile filter toggle */}
            <button>
              <FilterIcon size={20} /> Filter
            </button>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((prodObj) => (
            <ProductCard key={prodObj.id} productObj={prodObj} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
