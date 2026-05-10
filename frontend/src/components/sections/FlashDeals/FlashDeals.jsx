import { useEffect, useState } from 'react';
import styles from './FlashDeals.module.css';

function FlashDeals(timeDuration = 1) {
  const [timeLeft, setTimeLeft] = useState({ hr: timeDuration, m: 0, s: 0 });

  useEffect(function () {
    const timeDurationInMs = timeDuration * 60 * 60 * 1000;
    const countdownEndTime = Date.now() + timeDurationInMs;
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          {/* header left */}
          <div className={styles.header__left}>
            <div className={styles.header__label}>
              <span className={styles.header__flame}>🔥</span>
              Flash Deals
            </div>

            <h2 className={styles.title}>Today's Best Offers</h2>
          </div>

          {/* header right */}
          <div className={styles.header__right}>
            <p className={styles.timer__text}>Ends in:</p>

            <div className={styles.timer__wrapper}>
              <TimeBlock label="HR" value={hr} />
              <span className={styles.timer__seperator}>:</span>

              <TimeBlock label="MIN" value={min} />
              <span className={styles.timer__seperator}>:</span>

              <TimeBlock label="SEC" value={sec} />
              <span className={styles.timer__seperator}>:</span>
            </div>
          </div>
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
