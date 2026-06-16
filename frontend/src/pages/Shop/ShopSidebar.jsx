import { sidebarVariant } from './ShopVariants';
import { CATEGORIES } from '../../data/mockProducts';
import { motion } from 'framer-motion';
import styles from './Shop.module.css';
import useShopFilters from '../../hooks/useShopFilters';
import CloseIcon from '../../ui/icons/navigation/CloseIcon';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SUBCATEGORIES } from '../../data/mockModified';
import { CATEGORY_DATA } from '../../data/featuredCategory';

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

        {openSection === 'category' && (
          <div className={styles.filter_list}>
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
          </div>
        )}
      </div>

      {/* Category */}
      <div className={styles.filter_group}>
        <button
          className={styles.filter_label}
          onClick={() => handleSectionOpen('subcategory')}
        >
          Subcategory
        </button>

        {openSection === 'subcategory' && subCategoryItems && (
          <div className={styles.filter_list}>
            {subCategoryItems.items.map((itemObj) => (
              <button key={itemObj.id} className={styles.filter_option}>
                <span>{itemObj.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price range */}
      <div className={styles.filter_group}>
        <div className={styles.range_header}>
          <h4 className={styles.filter_label}>Price Range </h4>

          <span className={styles.filter_value}>
            ${minPrice} - ${maxPrice}
          </span>
        </div>

        <div className={styles.range_wrap} style={{ touchAction: 'none' }}>
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
        </div>
      </div>

      {/* Condition & Stock */}
      <div className={styles.filter_group}>
        <h4 className={styles.filter_label}>Condition</h4>

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

function SubCategory({ itemsArr = { itemsArr } }) {
  console.log(itemsArr);
  // return (
  //   <>
  //     {itemsArr.map((itemObj) => (
  //       <button key={itemObj.id} className={`${styles.filter_option} `}>
  //         <span>{itemObj.label} </span>
  //       </button>
  //     ))}
  //   </>
  // );
}

export default ShopSidebar;
{
  /* <SubCategory key={catObj.id} itemsArr={catObj.items} /> */
}
