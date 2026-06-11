import { CATEGORIES, getCategoryItems } from '../../data/mockProducts';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useFilter } from '../../context/FilterContext';
import { useState } from 'react';
import Slider from 'rc-slider';
import ProductCard from '../../ui/ProductCard/ProductCard';
import FilterIcon from '../../ui/icons/common/FilterIcon';
import styles from './Shop.module.css';
import Pagination from '../../ui/Pagination/Pagination';
import CloseIcon from '../../ui/icons/navigation/CloseIcon';
import 'rc-slider/assets/index.css'; // required — imports default styles

const ITEMS_PER_PAGE = 6;

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
  // const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [isLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // IMPORTANT -
  // Whenever a filter value isn't in the URL yet, read it with .get() and use || operator
  // to  provide a fallback default so the app always has a valid starting value.
  const sortBy = searchParams.get('sort') || 'newest';
  const category = searchParams.get('category') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 5000;

  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const categoryItems = getCategoryItems(category);

  const sorted = sortProducts(categoryItems, sortBy);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  // Page 1 → start = 0,  end = 20  → slice(0, 20)
  // Page 2 → start = 20, end = 40  → slice(20, 40)
  // Page 3 → start = 40, end = 60  → slice(40, 60)
  // Pattern: start = (page - 1) * 20, end = start + 20
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  // Only render products that belong to the current page
  const currentPageItems = sorted.slice(start, end);

  function handlePageChange(result) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: result,
    }));
  }

  function handleSortChange(e) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      sort: e.target.value,
      page: 1, // reset to first page on category change
    }));
  }

  function handleSideBarToggle() {
    setSideBarOpen((prev) => !prev);
  }

  function handlePriceChange(newArrRange) {
    const [min, max] = newArrRange;
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      minPrice: min,
      maxPrice: max,
    }));
  }

  function handleCategoryChange(categoryId) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev), // converts URL object to { sort: 'newest', category: 'fashion', page: '2' }
      page: 1, // reset to first page on category change
      category: categoryId,
    }));
  }

  // Motion
  const overlayVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const sidebarVariant = {
    hidden: {
      x: '-100%',
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      x: '-100%',
      transition: {
        duration: 0.3,
      },
    },
  };

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
            <button
              className={styles.filter_toggle}
              onClick={handleSideBarToggle}
            >
              <FilterIcon size={20} /> Filters
            </button>

            {/* Sort */}
            <select
              className={styles.sort_select}
              value={sortBy}
              onChange={handleSortChange}
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

        {/* Layout */}
        <div className={styles.layout}>
          <AnimatePresence>
            {sideBarOpen && (
              <>
                {/* Mobile overlay — sibling to sidebar */}
                {sideBarOpen && (
                  <motion.div
                    className={styles.sidebar_overlay}
                    variants={overlayVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  />
                )}

                {/* Sidebar */}
                <motion.div
                  className={styles.sidebar}
                  variants={sidebarVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Sidebar header */}
                  <div className={styles.sidebar__header}>
                    <h3>Filters</h3>

                    <button
                      className={styles.sidebar__close}
                      onClick={handleSideBarToggle}
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  {/* Category */}
                  <div className={styles.filter_group}>
                    <h4 className={styles.filter_label}>Category</h4>

                    <div className={styles.filter_list}>
                      {CATEGORIES.map((categoryObj) => (
                        <button
                          key={categoryObj.id}
                          className={`${styles.filter_option} ${styles.e}`}
                          onClick={() => handleCategoryChange(categoryObj.id)}
                        >
                          <span>{categoryObj.icon} </span>

                          <span>{categoryObj.label} </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div className={styles.filter_group}>
                    <div className={styles.range_header}>
                      <h4 className={styles.filter_label}>Price Range </h4>

                      <span className={styles.filter_value}>
                        ${minPrice} - ${maxPrice}
                      </span>
                    </div>

                    <div
                      className={styles.range_wrap}
                      style={{ touchAction: 'none' }}
                    >
                      <Slider
                        range
                        min={0}
                        max={5000}
                        step={10}
                        value={[minPrice, maxPrice]}
                        onChange={(newRangeArr) =>
                          handlePriceChange(newRangeArr)
                        } // [120, 400]
                      />
                    </div>
                  </div>

                  {/* Condition & Stock */}
                  <div className={styles.filter_group}>
                    <h4 className={styles.filter_label}>Condition</h4>

                    <label className={styles.checkbox_wrapper}>
                      <input type="checkbox" className={styles.checkbox} />
                      <span className={styles.checkbox_label}>Brand New</span>
                    </label>

                    <label className={styles.checkbox_wrapper}>
                      <input type="checkbox" className={styles.checkbox} />
                      <span className={styles.checkbox_label}>Fairly Used</span>
                    </label>

                    <label className={styles.checkbox_wrapper}>
                      <input type="checkbox" className={styles.checkbox} />
                      <span className={styles.checkbox_label}>
                        In Stock Only
                      </span>
                    </label>
                  </div>

                  {/* discount */}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {currentPageItems.length === 0 ? (
          <div className={styles.empty}>
            <h3 className={styles.empty__title}>No products found</h3>
            <p className={styles.empty__sub}>Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {currentPageItems.map((prodObj) => (
              <ProductCard key={prodObj.id} productObj={prodObj} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Shop;
