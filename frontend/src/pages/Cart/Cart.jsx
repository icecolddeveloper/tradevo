import { useCart } from '../../context/cartContext';
import styles from './Cart.module.css';
import Summary from './Summary';
import Item from './Item';

function Cart() {
  const { items, totalItems } = useCart();
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
              <button className={styles.clear_btn}>Clear cart</button>
            </div>

            {/* item list */}
            {items.map((itemObj) => (
              <Item key={itemObj.id} itemObj={itemObj} />
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
