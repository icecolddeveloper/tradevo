import { useCart } from '../../context/cartContext';
import { useState } from 'react';
import styles from './Cart.module.css';
import Summary from './Summary';
import Item from './Item';

function Cart() {
  const { items, totalItems, handleClearCart } = useCart();
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [selected, setSelected] = useState([]);

  console.log(selected);

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
              <button
                className={styles.select_multiple_btn}
                onClick={handleToggleSelectMode}
              >
                Select multiple
              </button>

              <button className={styles.clear_btn} onClick={handleClearCart}>
                Clear cart
              </button>
            </div>

            {/* item list */}
            {items.map((itemObj) => (
              <Item
                key={itemObj.id}
                itemObj={itemObj}
                multipleSelect={multipleSelect}
                handleItemSelect={() => handleItemSelect(itemObj)}
                selected={selected}
              />
            ))}

            {/* order summary */}
            <Summary totalItems={totalItems} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
