import { useWishlist } from '../../context/WishlistContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductCard from '../../ui/ProductCard/ProductCard';
import styles from './Wishlist.module.css';
import ListItem from '../../ui/ListItem/ListItem';

function Wishlist() {
  const { wishListItems, setRemoveSelected, setClear } = useWishlist();
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [selected, setSelected] = useState([]);

  const itemCount = wishListItems?.length;

  function handleMultipleSelect() {
    setMultipleSelect((prev) => !prev);
  }

  function handleSelectAll() {
    if (wishListItems.length > selected.length) {
      setSelected(wishListItems);
    } else {
      setSelected([]);
    }
  }

  function handleCancel() {
    setMultipleSelect(false);
  }

  function handleRemoveSelected() {
    if (selected.length === 0) return;

    setRemoveSelected(selected);
  }

  function handleClear() {
    setClear()
  }

  function handleItemSelect(itemObj) {
    setSelected((prev) => {
      const isExisting = prev.find((prodObj) => prodObj.id === itemObj.id);

      if (isExisting) {
        return prev.filter((prodObj) => prodObj.id !== itemObj.id); // remove if existing using filter
      } else {
        return [...prev, itemObj];
      }
    });
  }

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
          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>My Wishlist</h1>

            <p className={styles.sub}>
              {itemCount} saved item{itemCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* actions */}
        <div className={styles.items__actions}>
          {multipleSelect ? (
            <>
              <span>{selected.length} selected</span>

              <button
                className={styles.select__options_btn}
                onClick={handleSelectAll}
              >
                {wishListItems.length === selected.length
                  ? 'Deselect all'
                  : 'Select all'}
              </button>

              <button
                className={styles.item__remove_btn}
                onClick={handleRemoveSelected}
              >
                Remove
              </button>

              <button className={styles.cancel_btn} onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className={styles.select_multiple_btn} onClick={handleMultipleSelect}>Select multiple</button>

              <button className={styles.clear_btn} onClick={handleClear}>Clear all</button>
            </>
          )}
        </div>

        <motion.div className={styles.items_container} layout>
          <AnimatePresence>
            {wishListItems.map((itemObj) => (
              <motion.div>
                <ListItem
                  key={itemObj.id}
                  itemObj={itemObj}
                  multipleSelect={multipleSelect}
                  handleItemSelect={handleItemSelect}
                  selected={selected}
                  isWishlistComponent={true}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Wishlist;
