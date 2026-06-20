import { useWishlist } from '../../context/wishlistContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Wishlist.module.css';
import Item from './Item';

function Wishlist() {
  const { items, totalItems, handleClearWishlist, handleRemoveSelected } =
    useWishlist();
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [selected, setSelected] = useState([]);

  function handleToggleSelectMode() {
    setMultipleSelect((prev) => !prev);
    setSelected([]); // clear selected list
  }

  function handleItemSelect(itemObj) {
    setSelected((prev) => {
      const isExisting = prev.find((item) => item.id === itemObj.id);

      if (isExisting) {
        return prev.filter((item) => item.id !== itemObj.id);
      } else {
        return [...prev, itemObj];
      }
    });
  }

  function handleSelectAll() {
    if (selected.length < items.length) {
      setSelected(items);
    } else {
      setSelected([]);
    }
  }

  function handleRemoveSelectedItems() {
    if (selected.length === 0) return;

    handleRemoveSelected(selected);
    setMultipleSelect(false);
    setSelected([]);
  }

  function handleCancel() {
    setMultipleSelect(false);
    setSelected([]);
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty_state}>
        <div className="container">
          <div className={styles.empty}>
            <div>
              <span className={styles.empty__icon}>♡</span>
            </div>

            <h2 className={styles.empty__title}>Your wishlist is empty</h2>

            <p className={styles.empty__sub}>
              Save items you love so you can find them later.
            </p>

            <Link to="/shop" className={styles.empty__btn}>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Wishlist</h1>

          <span className={styles.count}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
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
                {items.length === selected.length
                  ? 'Deselect all'
                  : 'Select all'}
              </button>
              <button
                className={styles.item__remove_btn}
                onClick={handleRemoveSelectedItems}
                disabled={selected.length === 0}
              >
                Remove
              </button>
              <button className={styles.cancel_btn} onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.select_multiple_btn}
                onClick={handleToggleSelectMode}
              >
                Select multiple
              </button>

              <button
                className={styles.clear_btn}
                onClick={handleClearWishlist}
              >
                Clear all
              </button>
            </>
          )}
        </div>

        {/* item grid */}
        <div className={styles.grid}>
          {items.map((itemObj) => (
            <Item
              key={itemObj.id}
              itemObj={itemObj}
              multipleSelect={multipleSelect}
              handleItemSelect={handleItemSelect}
              selected={selected}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Wishlist;