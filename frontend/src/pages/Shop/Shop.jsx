import { getCategoryItems } from '../../data/mockProducts';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../ui/ProductCard/ProductCard';
import FilterIcon from '../../ui/icons/common/FilterIcon';
import styles from './Shop.module.css';
import Pagination from '../../ui/Pagination/Pagination';
import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const category = searchParams.get('category') || '';

  const page = Number(searchParams.get('page')) || 1;

  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category?.slice(1);

  const categoryItems = getCategoryItems(category);

  const sorted = sortProducts(categoryItems, sortBy);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  // Page 1 → start = 0,  end = 20  → slice(0, 20)
  // Page 2 → start = 20, end = 40  → slice(20, 40)
  // Page 3 → start = 40, end = 60  → slice(40, 60)
  // Pattern: start = (page - 1) * 20, end = start + 20
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  // Only render products that belong to the current page
  const currentPageItems = sorted.slice(start, end);

  function handlePageChange(newPage) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: newPage,
    }));
  }

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
          {currentPageItems.map((prodObj) => (
            <ProductCard key={prodObj.id} productObj={prodObj} />
          ))}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Shop;
