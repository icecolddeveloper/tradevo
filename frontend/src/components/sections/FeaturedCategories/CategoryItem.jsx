import ChevronClose from '../../../ui/icons/common/ChevronClose';
import styles from './FeaturedCategories.module.css';

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
      className={`${styles.category__item} ${activeId === catObj.id && dropdownOpen ? styles.category__label__active : ''} `}
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

export default CategoryItem;
