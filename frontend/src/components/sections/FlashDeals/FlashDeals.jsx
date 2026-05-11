import styles from './FlashDeals.module.css';
import { useCountdown } from '../../../hooks/useCountdown';
import ProductCard from '../../../ui/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

function FlashDeals({ timeDuration = 24, flashProducts = [] }) {
  const timeLeft = useCountdown(timeDuration);
  const { hr, min, sec } = timeLeft;

  if (flashProducts.length === 0) return;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.header__label}>
            <span className={styles.header__flame}>🔥</span>
            Flash Deals
          </div>

          {/* header right */}
          <div className={styles.header__wrapper}>
            <h2 className={styles.title}>Today's Best Offers</h2>

            <div className={styles.header__content}>
              <p className={styles.timer__text}>Ends in:</p>

              <div className={styles.timer__content}>
                <div className={styles.timer__wrapper}>
                  <TimeBlock label="HR" value={hr} />
                  <span className={styles.timer__separator}>:</span>

                  <TimeBlock label="MIN" value={min} />
                  <span className={styles.timer__separator}>:</span>

                  <TimeBlock label="SEC" value={sec} />
                </div>

                <Link to="/shop" className={styles.view_all}>
                  See all deals →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scroll_track}>
          {flashProducts.map((productObj) => (
            <div key={productObj.id}  className={styles.card_wrap}>
              <ProductCard productObj={productObj} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div className={styles.timer__block}>
      <span className={styles.timer__num}>
        {String(value).padStart(2, '0')}
      </span>

      <span className={styles.timer__label}>{label}</span>
    </div>
  );
}
export default FlashDeals;
