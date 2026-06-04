import BackArrowIcon from '../icons/common/NavigateBackIcon';
import NextArrow from '../icons/common/NextArrow';
import styles from './Pagination.module.css';

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <nav className={styles.pagination}>
      <button
        className={styles.prev_btn}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <BackArrowIcon /> Prev
      </button>

      <div
        className={styles.page_indicator}
      >{`Page ${page} of ${totalPages}`}</div>

      <button
        className={styles.next_btn}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        Next <NextArrow />
      </button>
    </nav>
  );
}

export default Pagination;
