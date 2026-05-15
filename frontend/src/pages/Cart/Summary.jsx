import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/cartContext';
import styles from './Cart.module.css';
import NavigateBackIcon from '../../ui/icons/common/NavigateBackIcon';

function Summary({ totalItems, discount = false }) {
  const { handleGetSubTotal, handleCheckout } = useCart();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className={styles.summary}>
      <h2 className={styles.summary__title}>Order Summary</h2>

      <div className={styles.summary__lines}>
        {/* subtotal */}
        <div className={styles.summary__line}>
          <span>
            Subtotal ({totalItems} {totalItems < 2 ? 'item' : 'items'})
          </span>
          <span>${handleGetSubTotal().toFixed(2)}</span>
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

        {/* total */}
        <div className={styles.summary__total}>
          <span className={styles.summary__total_title}>Total</span>
          <span>{handleGetSubTotal().toFixed(2)}</span>
        </div>

        <button className={styles.checkout_btn} onClick={handleCheckout}>
          {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
        </button>

        <Link to="/shop" className={styles.continue_link}>
          <NavigateBackIcon size={20} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Summary;
