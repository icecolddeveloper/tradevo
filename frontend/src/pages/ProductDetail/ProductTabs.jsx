import styles from './ProductDetail.module.css';

function ProductTabs({
  productObj,
  activeTab,
  handleTabSelect,
  isAuthenticated,
}) {
  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__nav}>
        {['Specs', 'Reviews'].map((tabName, idx) => (
          <button
            key={tabName}
            className={`${styles.tab_btn} 
                  ${tabName === activeTab ? styles.tab_btn__active : ''} 
                  ${idx === 0 ? styles.idx_1_tab_btn : ''}`}
            onClick={(tabName) => handleTabSelect(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      <div className={styles.tab_content}>
        {/* Specs */}
        {activeTab === 'Specs' && (
          <div className={styles.specs_grid}>
            {Object.entries(productObj.specs).map(([key, val]) => (
              <div className={styles.spec_row}>
                <span className={styles.spec_key}>{key}</span>
                <span className={styles.spec_val}>{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'Reviews' && (
          <div className={styles.reviews}>
            <div className={styles.reviews__empty}>
              {/* Contents */}
              <h3 className={styles.reviews__empty__title}>No reviews yet</h3>

              <p className={styles.reviews__empty__sub}>
                Be the first to share your experience with this product.
              </p>

              {/* CTA */}
              {isAuthenticated ? (
                <button className={styles.reviews__write_btn}>
                  Write a Review
                </button>
              ) : (
                <div className={styles.reviews__cta}>
                  <p>
                    Have this product?{' '}
                    <Link to="/login" className={styles.reviews__login_link}>
                      Sign in
                    </Link>{' '}
                    to write the first review.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTabs;
