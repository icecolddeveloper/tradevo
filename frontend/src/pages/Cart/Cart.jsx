import { useCart } from '../../context/cartContext';
import { useState } from 'react';
import styles from './Cart.module.css';
import Summary from './Summary';
import Item from './Item';

function Cart() {
  const { items, totalItems, handleClearCart } = useCart();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selected, setSelected] = useState(false);

  // function handleItemSelect() {
  //   setSelected(true);
  // }

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
                onClick={() => setIsSelecting(!isSelecting)}
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
                isSelecting={isSelecting} //todo: use handle later
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
