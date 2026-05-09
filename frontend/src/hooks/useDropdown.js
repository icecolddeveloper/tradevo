import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORY_DATA } from '../data/featuredCategory';
import styles from '../components/sections/FeaturedCategories/FeaturedCategories.module.css';

export function useDropdown() {
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

  return {
    dropdownLeft,
    activeCategoryObj,
    handleClick,
    handleMouseEnter,
    scheduleClose,
    sectionRef,
    activeId,
    dropdownOpen,
    cancelClose,
  };
}
