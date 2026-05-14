import styles from './Cart.module.css';

function Summary({ totalItems, discount = false }) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.summary__title}>Order Summary</h2>

      <div className={styles.summary__lines}>
        {/* subtotal */}
        <div className={styles.summary__line}>
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalItems.toFixed(2)}</span>
        </div>

        {/* shipping */}
        <div className={styles.summary__line}>
          <span>Shipping</span>
          <span className={styles.summary__free}>
            {totalItems >= 49 ? 'Free' : '$4.99'}
          </span>
        </div>

        {/* discount: after user enters code */}
        {discount && (
          <div
            className={`${styles.summary__line} ${styles.summary__line__discount}`}
          >
            <span>Discount ({discount.code})</span>
            {/* <span>−${discountAmount.toFixed(2)}</span> */}
          </div>
        )}

        {/* Discount code */}
        <div className={styles.discount}>
          <p className={styles.discount__label}>Discount code</p>

          {discount ? (
            <div className={styles.discount__applied}>
              <span className={styles.discount__notifier}>
                {discount.code} -{' '}
              </span>
            </div>
          ) : (
            <div className={styles.discount__row}>
              <input className={styles.discount__input} />

              <button className={styles.discount__btn}>Apply</button>

              {/* {discountError && <p className={styles.discount__error}>{}</p>}
              {discountSuccess && <p className={styles.discount__success}>{}</p>} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
