import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_DATA } from '../../../data/featuredCategory';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './FeaturedCategories.module.css';
import ChevronClose from '../../../ui/icons/common/ChevronClose';

function FeaturedCategories() {
  const [activeId, setActiveId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const sectionRef = useRef(null);

  const activeCategoryObj = CATEGORY_DATA.find(
    (catObj) => catObj.id === activeId,
  );

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
    setActiveId(null);
  }, []);

  // Click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (sectionRef.current && !sectionRef.current.contains(e.target)) {
        closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropdown]);

  // Scroll close — threshold so mobile users can scroll to read the dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    const startY = window.scrollY;

    function handleScroll() {
      if (Math.abs(window.scrollY - startY) > 380) {
        closeDropdown();
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dropdownOpen, closeDropdown]);

  function handleOpen(e, id) {
    const isWide = window.matchMedia('(min-width: 1020px)').matches;
    let offset = 0;

    if (isWide) {
      const buttonEl = e.currentTarget;
      const containerEl = buttonEl.closest(`.${styles.main__container}`);
      const containerRect = containerEl.getBoundingClientRect();
      const buttonRect = buttonEl.getBoundingClientRect();
      const dropdownWidth = 360;

      const rawOffset = buttonRect.left - containerRect.left;
      const maxOffset = containerRect.width - dropdownWidth;

      offset = Math.min(rawOffset, maxOffset);
    }

    setDropdownLeft(offset);
    setActiveId(id);
    setDropdownOpen(true);
  }

  function handleClick(e, id) {
    if (activeId === id && dropdownOpen) {
      closeDropdown();
    } else {
      handleOpen(e, id);
    }
  }

  function handleMouseEnter(e, id) {
    if (!window.matchMedia('(hover: hover)').matches) return;
    handleOpen(e, id);
  }

  const dropdownVariants = {
    hidden: { y: -4, scaleY: 0.9, opacity: 0 },
    visible: {
      y: 0,
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: { y: -4, scaleY: 0.9, opacity: 0 },
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Browse by category</h2>
          <Link to="/shop" className={styles.view__all}>
            View all →
          </Link>
        </div>

        <div className={styles.main__container}>
          <div className={styles.category__items__container}>
            {CATEGORY_DATA.map((catObj) => (
              <CategoryItem
                key={catObj.id}
                catObj={catObj}
                activeId={activeId}
                dropdownOpen={dropdownOpen}
                handleClick={handleClick}
                handleMouseEnter={handleMouseEnter}
              />
            ))}
          </div>

          <AnimatePresence>
            {dropdownOpen && activeId && (
              <motion.div
                className={styles.dropdown__wrapper}
                style={{ left: dropdownLeft }}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className={styles.dropdown__inner}>
                  <div className={styles.dropdown__links}>
                    <p className={styles.dropdown__heading}>Subcategories</p>
                    {activeCategoryObj.items.map((catItem) => (
                      <DropdownLink key={catItem} catItem={catItem} />
                    ))}
                  </div>

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
                    <Link to={``} className={styles.dropdown__card__cta}>
                      Shop {activeCategoryObj.label}
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

function DropdownLink({ catItem }) {
  return (
    <Link to={`shop/${catItem.id}`} className={styles.dropdown__link}>
      <span className={styles.dropdown__dot}></span>
      {catItem}
    </Link>
  );
}

function CategoryItem({
  catObj,
  handleClick,
  handleMouseEnter,
  activeId,
  dropdownOpen,
}) {
  const IconName = catObj.icon;

  return (
    <button
      className={styles.category__item}
      onClick={(e) => handleClick(e, catObj.id)}
      onMouseEnter={(e) => handleMouseEnter(e, catObj.id)}
    >
      <IconName className={styles.category__icon} size={23} />
      <span className={styles.category__label}>{catObj.label}</span>
      <ChevronClose
        size={20}
        className={`${styles.chevron__close__icon} ${catObj.id === activeId ? styles.category__chevron__rotate : ''} ${!dropdownOpen ? styles.category__chevron__restore : ''}`}
      />
    </button>
  );
}

export default FeaturedCategories;
