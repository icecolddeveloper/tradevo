import { sectionVariants, sidebarVariant } from './ShopVariants';
import { CATEGORY_DATA } from '../../data/featuredCategory';
import { CATEGORIES } from '../../data/mockProducts';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Shop.module.css';
import useShopFilters from '../../hooks/useShopFilters';
import CloseIcon from '../../ui/icons/navigation/CloseIcon';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function ShopSidebar({ handleSideBarToggle }) {
  const {
    // State
    openSection,

    // Filter values from URL
    category,
    minPrice,
    maxPrice,
    isBrandNew,
    isFairlyUsed,

    // Derived values
    currentPageItems,

    // Handlers
    handleCategoryChange,
    handlePriceChange,
    handleSubCategoryChange,
    handleBrandNewToggle,
    handleUsedToggle,
    handleInStockToggle,
    handleResetFilters,
    handleSectionOpen,
  } = useShopFilters();

  const subCategoryItems = CATEGORY_DATA.find(
    (catObj) => catObj.id === category,
  );

  return (
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

        <button className={styles.sidebar__close} onClick={handleSideBarToggle}>
          <CloseIcon />
        </button>
      </div>

      {/* Category */}
      <div className={styles.filter_group}>
        <button
          className={styles.filter_label}
          onClick={() => handleSectionOpen('category')}
        >
          Category
        </button>

        <AnimatePresence>
          {openSection === 'category' && (
            <motion.div
              className={styles.filter_list}
              key="category-list"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ overflow: 'hidden' }}
            >
              {CATEGORIES.map((categoryObj) => (
                <button
                  key={categoryObj.id}
                  className={`${styles.filter_option} ${categoryObj.id === category ? styles.filter_option__active : ''}`}
                  onClick={() => handleCategoryChange(categoryObj.id)}
                >
                  <span>{categoryObj.icon} </span>

                  <span>{categoryObj.label} </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sub category */}
      <div className={styles.filter_group}>
        <button
          className={styles.filter_label}
          onClick={() => handleSectionOpen('subcategory')}
        >
          {category} Subcategory
        </button>

        <AnimatePresence>
          {openSection === 'subcategory' && subCategoryItems && (
            <motion.div
              className={styles.filter_list}
              key="subCategory-list"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ overflow: 'hidden' }}
            >
              {subCategoryItems.items.map((itemObj) => (
                <button
                  key={itemObj.id}
                  className={styles.filter_option}
                  onClick={() => handleSubCategoryChange(itemObj.id)}
                >
                  <span className={styles.dropdown__dot}></span>
                  <span>{itemObj.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price range */}
      <div className={styles.filter_group}>
        <button
          className={styles.range_header}
          onClick={() => handleSectionOpen('priceRange')}
        >
          <p className={styles.filter_label}>Price Range </p>

          <span className={styles.filter_value}>
            ${minPrice} - ${maxPrice}
          </span>
        </button>

        <AnimatePresence>
          {openSection === 'priceRange' && (
            <motion.div
              className={styles.range_wrap}
              key="price-range"
              style={{ touchAction: 'none' }}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Slider
                range
                min={0}
                max={5000}
                step={10}
                value={[minPrice, maxPrice]}
                onChange={(newRangeArr) =>
                  handlePriceChange(newRangeArr, currentPageItems)
                } // [120, 400]
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Condition & Stock */}
      <div className={styles.filter_group}>
        <button
          className={styles.filter_label}
          onClick={() => handleSectionOpen('condition')}
        >
          Condition
        </button>

        <AnimatePresence>
          {openSection === 'condition' && (
            <motion.div
              className={styles.condition_wrap}
              key="condition"
              style={{ touchAction: 'none', overflow: 'hidden' }}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <label className={styles.checkbox_wrapper}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isBrandNew}
                  onChange={handleBrandNewToggle}
                />
                <span className={styles.checkbox_label}>Brand New</span>
              </label>

              <label className={styles.checkbox_wrapper}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isFairlyUsed}
                  onChange={handleUsedToggle}
                />
                <span className={styles.checkbox_label}>Fairly Used</span>
              </label>

              <label className={styles.checkbox_wrapper}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={handleInStockToggle}
                />

                <span className={styles.checkbox_label}>In Stock Only</span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear all */}
      <div className={styles.clear_filter_wrap}>
        <button
          className={styles.clear_filter_btn}
          onClick={handleResetFilters}
        >
          Clear all
        </button>
      </div>
    </motion.div>
  );
}

export default ShopSidebar;
