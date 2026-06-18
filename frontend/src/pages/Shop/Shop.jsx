import { gridVariants, overlayVariant } from './ShopVariants';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProductCard from '../../ui/ProductCard/ProductCard';
import FilterIcon from '../../ui/icons/common/FilterIcon';
import Pagination from '../../ui/Pagination/Pagination';
import useShopFilters from '../../hooks/useShopFilters';
import styles from './Shop.module.css';
import ShopSidebar from './ShopSidebar';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

function Shop() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [isLoading] = useState(false);
  const {
    // Filter values from URL
    category,
    sortBy,
    currentPage,

    // Derived values
    isBrandNew,
    isFairlyUsed,
    currentPageItems,
    totalPages,
    capitalizedCategory,
    capitalizedSubCategory,

    // Handlers
    handleSortChange,
    handlePageChange,
  } = useShopFilters();

  function handleSideBarToggle() {
    setSideBarOpen((prev) => !prev);
  }

  function closeSidebar() {
    setSideBarOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = sideBarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sideBarOpen]);

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
              {capitalizedSubCategory && ` > ${capitalizedSubCategory}`}
            </div>

            <p className={styles.count}>
              {isLoading ? '—' : `${currentPageItems.length} products`}
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
                    onClick={closeSidebar}
                    variants={overlayVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  />
                )}

                {/* Sidebar */}
                <ShopSidebar handleSideBarToggle={handleSideBarToggle} />
              </>
            )}
          </AnimatePresence>
        </div>

        {currentPageItems.length === 0 ? (
          isBrandNew && isFairlyUsed ? (
            <div className={styles.empty}>
              <h3 className={styles.empty__title}>Conflicting filters</h3>
              <p className={styles.empty__sub}>
                Choose brand new or fairly used, not both.
              </p>
            </div>
          ) : (
            <div className={styles.empty}>
              <h3 className={styles.empty__title}>No products found</h3>
              <p className={styles.empty__sub}>Try adjusting your filters.</p>
            </div>
          )
        ) : (
          <motion.div
            className={styles.grid}
            key={category + sortBy + currentPage}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {currentPageItems.map((prodObj) => (
              <ProductCard key={prodObj.id} productObj={prodObj} />
            ))}
          </motion.div>
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
