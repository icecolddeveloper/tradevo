import NextArrow from '../icons/common/NextArrow';
import PrevArrow from '../icons/common/PrevArrow';
import ReturnIcon from '../icons/common/ReturnIcon';
import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <nav className={styles.pagination}>
      <PrevArrow
        className={`${styles.btn} ${currentPage === 1 ? styles.btn__disabled : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        handleDisable={currentPage === 1}
        size={18}
      />

      {pages.map((num) => {
        // Always show page 1 and last page
        const isFirst = num === 1;
        const isLast = num === totalPages;

        // Always show current page and its neighbours
        const isNearCurrent =
          num >= currentPage - 1 && num <= currentPage + 1;

        // Show left dots — first hidden page to the left of current's neighbours
        const isLeftDots = num === currentPage - 2;

        // Show right dots — first hidden page to the right of current's neighbours
        const isRightDots = num === currentPage + 2;

        if (isFirst || isLast || isNearCurrent) {
          return (
            <button
              key={num}
              className={`${styles.num_btn} ${currentPage === num ? styles.btn__active : ''}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          );
        }

        if (isLeftDots || isRightDots) {
          return (
            <span key={`dots-${num}`} className={styles.ellipsis}>
              ...
            </span>
          );
        }

        // Hide everything else
        return null;
      })}

      <NextArrow
        className={`${styles.btn}`}
        onClick={() => onPageChange(currentPage + 1)}
        handleDisable={currentPage === totalPages}
        size={18}
      />
    </nav>
  );
}

export default Pagination;