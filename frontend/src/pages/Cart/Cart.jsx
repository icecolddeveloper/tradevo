import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Cart.module.css';
import Summary from './Summary';
import Item from './Item';
import ListItem from '../../ui/ListItem/ListItem';

function Cart() {
  const { items, totalItems, handleClearCart, handleDeleteSelected } =
    useCart();
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [selected, setSelected] = useState([]);

  console.log(items, selected);

  function handleToggleSelectMode() {
    setMultipleSelect((prev) => !prev);
    setSelected([]); // clear selected list
  }

  function handleItemSelect(itemObj) {
    setSelected((prev) => {
      const isExisting = prev.find((item) => item.itemKey === itemObj.itemKey); // best here to avoid getting stale value

      if (isExisting) {
        return prev.filter((item) => item.itemKey !== itemObj.itemKey); // remove if existing using filter
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

  function handleRemoveSelected() {
    if (selected.length === 0) return;

    handleDeleteSelected(selected);
    setMultipleSelect(false);
    setSelected([]);
  }

  function handleCancel() {
    setMultipleSelect(false);
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty_state}>
        <div className="container">
          <div className={styles.empty}>
            <div>
              <span className={styles.empty__icon}>🛒</span>
            </div>

            <h2 className={styles.empty__title}>Your cart is empty</h2>

            <p className={styles.empty__sub}>
              Looks like you haven't added anything yet.
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
          <h1 className={styles.title}>Shopping Cart</h1>

          <span className={styles.count}>
            {totalItems}{' '}
            {totalItems === 0 || totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className={styles.layout}>
          {/* cart items */}
          <div className={styles.items}>
            {/* clear all */}
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
                      : 'Select  all'}
                  </button>
                  <button
                    className={styles.item__remove_btn}
                    onClick={handleRemoveSelected}
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
                    onClick={handleClearCart}
                  >
                    Clear cart
                  </button>
                </>
              )}
            </div>

            {/* item list */}
            {items.map((itemObj) => (
              <ListItem
                key={itemObj.id}
                itemObj={itemObj}
                multipleSelect={multipleSelect}
                handleItemSelect={handleItemSelect}
                selected={selected}
                isCartComponent={true}
              />
            ))}
          </div>

          {/* order summary */}
          <Summary totalItems={totalItems} />
        </div>
      </div>
    </section>
  );
}

export default Cart;
