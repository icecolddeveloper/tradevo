import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORY_DATA } from '../../../data/featuredCategory';
import { useDropdown } from '../../../hooks/useDropdown';
import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';
import DropdownLink from './DropdownLink';
import CategoryItem from './CategoryItem';

function FeaturedCategories() {
  const {
    dropdownLeft,
    activeCategoryObj,
    handleClick,
    handleMouseEnter,
    scheduleClose,
    sectionRef,
    activeId,
    dropdownOpen,
    cancelClose,
  } = useDropdown();

  const dropdownVariants = {
    hidden: { y: -6, scaleY: 0.95, opacity: 0 },
    visible: {
      y: 0,
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      y: -4,
      scaleY: 0.97,
      opacity: 0,
      transition: { duration: 0.15, ease: 'easeIn' },
    },
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Browse by category</h2>

          <Link to="/shop" className={styles.view__all}>
            View all →
          </Link>
        </div>

        <div className={styles.main__container} ref={sectionRef}>
          {/* Category Title */}
          <div className={styles.category__items__container}>
            {CATEGORY_DATA.map((catObj) => (
              <CategoryItem
                key={catObj.id}
                catObj={catObj}
                handleClick={handleClick}
                activeId={activeId}
                dropdownOpen={dropdownOpen}
                handleMouseEnter={handleMouseEnter}
                scheduleClose={scheduleClose}
              />
            ))}
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && activeId && (
              <motion.div
                className={styles.dropdown__wrapper}
                variants={dropdownVariants}
                style={{ left: dropdownLeft }}
                key={activeId}
                initial="hidden"
                animate="visible"
                exit="exit"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
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
                  <div
                    className={styles.dropdown__card}
                    style={{ background: activeCategoryObj.color }}
                  >
                    <div className={styles.dropdown__top}>
                      <p className={styles.dropdown__card__eye}>
                        {activeCategoryObj.label}
                      </p>
                      <p className={styles.dropdown__card__name}>
                        {activeCategoryObj.featured.name}
                      </p>
                      <span className={styles.dropdown__card__badge}>
                        {activeCategoryObj.featured.discount}
                      </span>
                    </div>

                    {/* Link */}
                    <Link to={``} className={styles.dropdown__card__cta}>
                      Shop {activeCategoryObj.label}{' '}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
