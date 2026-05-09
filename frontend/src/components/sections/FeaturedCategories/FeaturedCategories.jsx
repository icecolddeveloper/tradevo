import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORY_DATA } from '../../../data/featuredCategory';
import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';
import ChevronClose from '../../../ui/icons/common/ChevronClose';

function FeaturedCategories() {
  const [activeId, setActiveId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const timerRef = useRef();
  const sectionRef = useRef();

  const activeCategoryObj = CATEGORY_DATA.find(
    (catObj) => catObj.id === activeId,
  );

  /* function move/shift a dropdown horizontally so it appears under the btn the user clicked, 
     but also prevents the dropdown from overflowing outside the main container. 
  */
  function calculateDropdownLeftPosition(e) {
    const isDesktopScreen = window.matchMedia('(min-width: 1020px)').matches;

    if (!isDesktopScreen) return 0;

    const clickedCategoryButton = e.currentTarget;
    const categoryContainer = clickedCategoryButton.closest(
      `.${styles.main__container}`,
    );

    if (!categoryContainer) return 0;

    const containerPosition = categoryContainer.getBoundingClientRect();
    const buttonPosition = clickedCategoryButton.getBoundingClientRect();

    const dropdownWidth = 360;

    const buttonLeftInsideContainer =
      buttonPosition.left - containerPosition.left;

    const maxLeftPosition = Math.max(
      containerPosition.width - dropdownWidth,
      0,
    );

    // Use the button's left position, but never go beyond the maximum allowed left position.
    const dropdownLeftPosition = Math.min(
      buttonLeftInsideContainer,
      maxLeftPosition,
    );

    return dropdownLeftPosition;
  }

  // dropdown show/hide
  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
    setActiveId(null);
  }, []);

  useEffect(
    function () {
      if (!dropdownOpen) return;
      const scrollYWhenOpened = window.scrollY;

      function handleScroll() {
        if (Math.abs(window.scrollY - scrollYWhenOpened) > 380) {
          closeDropdown();
        }
      }

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    },
    [dropdownOpen, closeDropdown],
  );

  useEffect(
    function () {
      function handleTouchOutside(e) {
        if (sectionRef.current && !sectionRef.current.contains(e.target)) {
          closeDropdown();
        }
      }

      document.addEventListener('touchend', handleTouchOutside);
      return () => document.removeEventListener('touchend', handleTouchOutside);
    },
    [closeDropdown],
  );

  function showDropdown(e, clickedId) {
    const offset = calculateDropdownLeftPosition(e);

    setDropdownOpen(true);
    setActiveId(clickedId);
    setDropdownLeft(offset);
  }

  function handleClick(e, clickedId) {
    if (clickedId === activeId && dropdownOpen) {
      closeDropdown();
    } else {
      showDropdown(e, clickedId);
    }
  }

  // mouse enter & leave
  function cancelClose() {
    clearTimeout(timerRef.current);
  }

  function handleMouseEnter(e, clickedId) {
    cancelClose();
    showDropdown(e, clickedId);
  }

  function scheduleClose() {
    timerRef.current = setTimeout(() => {
      closeDropdown();
    }, 200);
  }

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
  scheduleClose,
  activeId,
  dropdownOpen,
}) {
  const IconName = catObj.icon;

  return (
    <button
      className={`${styles.category__item} ${activeId === catObj.id ? styles.category__label__active : ''} `}
      onClick={(e) => handleClick(e, catObj.id)}
      onMouseEnter={(e) => handleMouseEnter(e, catObj.id)}
      onMouseLeave={scheduleClose}
    >
      <div className={styles.category__item__desc}>
        <IconName className={styles.category__icon} size={22} />
        <span className={styles.category__label}>{catObj.label}</span>
      </div>

      <ChevronClose
        size={20}
        className={`${styles.chevron__close__icon} ${catObj.id === activeId ? styles.category__chevron__rotate : ''} ${!dropdownOpen ? styles.category__chevron__restore : ''}`}
      />
    </button>
  );
}

export default FeaturedCategories;
