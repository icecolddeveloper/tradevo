import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/cartContext';
import styles from './Cart.module.css';
import NavigateBackIcon from '../../ui/icons/common/NavigateBackIcon';

const VALID_CODES = {
  SAVE10: { type: 'percent', value: 10, label: '10% off' },
  SAVE20: { type: 'percent', value: 20, label: '20% off' },
  FLAT15: { type: 'fixed', value: 15, label: '$15 off' },
  TRADEVO: { type: 'percent', value: 15, label: '15% off' },
};

function Summary({ totalItems }) {
  const {
    discount,
    handleGetSubTotal,
    handleCheckout,
    handleApplyDiscount,
    total,
    handleRemoveDiscount,
    discountAmount,
  } = useCart();
  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [discountSuccess, setDiscountSuccess] = useState('');

  const [isAuthenticated] = useState(false);

  function applyDiscount() {
    const enteredCode = discountInput.trim().toUpperCase();

    if (!enteredCode) {
      setDiscountError('Enter a discount code.');
      return;
    }
    const discountObj = VALID_CODES[enteredCode];
    if (!discountObj) {
      setDiscountError('This code is invalid or has expired.');
    }

    handleApplyDiscount({ enteredCode, ...discountObj });

    setDiscountError('');
    setDiscountSuccess(`✓ Code applied — ${discountObj.label}`);
    setDiscountInput('');
  }

  function removeDiscount() {
    handleRemoveDiscount();
  }

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
            {total >= 49 ? 'Free' : '$4.99'}
          </span>
        </div>

        {/* discount: after user enters code */}
        {discount && (
          <div
            className={`${styles.summary__line} ${styles.summary__line__discount}`}
          >
            <span>Discount ({discount.enteredCode})</span>
            <span>−${discountAmount().toFixed(2)}</span>
          </div>
        )}

        {/* Discount code */}
        <div className={styles.discount}>
          <p className={styles.discount__label}>Discount code</p>

          {discount ? (
            <div className={styles.discount__applied}>
              <span>
                {discount.enteredCode} —{' '}
                {discountSuccess.replace('✓ Code applied — ', '')}
              </span>

              <button
                className={styles.discount__remove}
                onClick={() => {
                  removeDiscount();
                  setDiscountSuccess('');
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className={styles.discount__row}>
                <input
                  className={styles.discount__input}
                  placeholder="Enter code"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                />

                <button
                  className={styles.discount__btn}
                  onClick={applyDiscount}
                >
                  Apply
                </button>
              </div>

              {discountError && (
                <p className={styles.discount__error}>{discountError}</p>
              )}
              {discountSuccess && (
                <p className={styles.discount__success}>{discountSuccess}</p>
              )}
            </>
          )}
        </div>

        {/* total */}
        <div className={styles.summary__total}>
          <span className={styles.summary__total_title}>Total</span>
          <span>{total.toFixed(2)}</span>
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
