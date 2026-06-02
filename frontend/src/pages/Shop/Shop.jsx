import { getCategoryItems } from '../../data/mockProducts';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './Shop.module.css';
import ProductCard from '../../ui/ProductCard/ProductCard';
import FilterIcon from '../../ui/icons/common/FilterIcon';
import { ProductCardSkeleton } from '../../ui/Skeleton/Skeleton';

const ITEMS_PER_PAGE = 20;

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'newest';

  const { category } = useParams(); // e.g. electronics
  const [isLoading, setIsLoading] = useState(false);

  console.log(searchParams, sortBy);

  const capitalizedCategory =
    category?.charAt(0).toUpperCase() + category?.slice(1);

  const categoryItems = getCategoryItems(category);
  console.log(categoryItems);

  // Sort logic
  // const [sortBy, setSortBy] = useState('newest');

  const low = [...categoryItems].sort((objA, objB) => objA.price - objB.price);

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
        console.log('unknown sort');
      }
    }
  }

  const sorted = sortProducts(categoryItems, sortBy);

  console.log(sorted);

  console.log(sortBy);
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

          <div className={styles.header__actions}>
            {/* Mobile filter toggle */}
            <button>
              <FilterIcon size={20} /> Filter
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSearchParams({sortBy: e.target.value})}
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
          {sorted.map((prodObj) => (
            <ProductCard key={prodObj.id} productObj={prodObj} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
