import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Wishlist.module.css';

function Wishlist() {
  const itemCount = 1;
  const [multipleSelect, setMultipleSelect] = useState(true);
  
  if (itemCount === 0) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.empty__title}>Your wishlist is empty</h2>
        <p className={styles.empty__sub}>
          Save items you love to find them here later.
        </p>
        <Link to="/shop" className={styles.empty__btn}>
          Browse Products
        </Link>
      </div>
    );
  }
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>My Wishlist</h1>

            <p className={styles.sub}>
              {itemCount} saved item{itemCount > 1 ? 's' : ''}
            </p>
          </div>

          {/* actions */}
          <div className={styles.items__actions}>
            {multipleSelect ? (
              <>
                <button>Select all</button>
                <button>Remove</button>
                <button>Cancel</button>
              </>
            ) : (
              <>
                <button>Select multiple</button>
                <button>Clear all</button>
              </>
            )}
          </div>
        </div>

        {/* <motion.div className={styles.grid} layout>
          <AnimatePresence>
            {[].map((product) => (
              <motion.div>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div> */}
      </div>
    </section>
  );
}

export default Wishlist;
