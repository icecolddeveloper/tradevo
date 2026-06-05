import NextArrow from '../icons/common/NextArrow';
import PrevArrow from '../icons/common/PrevArrow';
import ReturnIcon from '../icons/common/ReturnIcon';
import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  console.log(totalPages);
  return (
    <nav className={styles.pagination}>
      <PrevArrow
        className={`${styles.btn} ${currentPage === 1 ? styles.btn__disabled : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        handleDisable={currentPage === 1}
        size={18}
      />

      {pages.map((pageNum, idx) => {
        // Always show page 1 and last page
        const isFirst = pageNum === 1;
        const isLast = pageNum === totalPages;

        // Always show current page and its neighbours
        const isNearCurrent =
          currentPage - 1 <= pageNum && currentPage + 1 >= pageNum;

        // Show left dots — first hidden page to the left of current's neighbours
        const isLeftDots = pageNum === currentPage - 2;

        // Show right dots — first hidden page to the right of current's neighbours
        const isRightDots = pageNum === currentPage + 2;

        if (isFirst || isLast || isNearCurrent) {
          return (
            <button
              key={pageNum}
              className={`${styles.pageNum_btn} ${currentPage === pageNum ? styles.btn__active : ''}`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        }

        if (isLeftDots || isRightDots) {
          return (
            <span key={`dots-${pageNum}`} className={styles.ellipsis}>
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