import { Link } from 'react-router-dom';
import styles from './MegaMenu.module.css';
import { motion } from 'framer-motion';

const menuVariants = {
  initial: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const itemsVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + idx * 0.04, // 0.1s base + 0.04s stagger per item
      duration: 0.2,
      ease: 'easeOut',
    },
  }),
};

function MegaMenu({ categories, onClose }) {
  return (
    <motion.div
      className={styles.megamenu__wrapper}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {
        <div className={styles.megamenu__inner}>
          <p className={styles.megamenu__label}>Browse Categories</p>

          <div className={styles.megamenu__grid}>
            {categories.map((categoryObj, i) => (
              <MegaMenuItem
                key={categoryObj.id}
                idx={i}
                categoryObj={categoryObj}
                onClose={onClose}
              />
            ))}
          </div>

          <div className={styles.megamenu__footer}>
            <Link to="shop" className={styles.megamenu__all_link}>
              View all products →
            </Link>
          </div>
        </div>
      }
    </motion.div>
  );
}

function MegaMenuItem({ idx, categoryObj, onClose }) {
  return (
    <motion.div
      variants={itemsVariants}
      custom={idx}
      initial="hidden"
      animate="visible"
    >
      <Link
        to={`/shop/${categoryObj.id}`}
        className={styles.megamenu__item}
        onClick={onClose}
      >
        <span className={styles.megamenu__item__icon}>{categoryObj.icon}</span>
        <span className={styles.megamenu__item__label}>
          {categoryObj.label}
        </span>
      </Link>
    </motion.div>
  );
}

export default MegaMenu;
