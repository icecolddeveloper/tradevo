import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import styles from './Cart.module.css';
import DeleteIcon from '../../ui/icons/common/DeleteIcon';

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

function Summary({ totalItems, discount = false }) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.summary__title}>Order Summary</h2>

      <div className={styles.summary__lines}>
        {/* subtotal */}
        <div className={styles.summary__line}>
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalItems.toFixed(2)}</span>
        </div>

        {/* shipping */}
        <div className={styles.summary__line}>
          <span>Shipping</span>
          <span className={styles.summary__free}>
            {totalItems >= 49 ? 'Free' : '$4.99'}
          </span>
        </div>

        {/* discount: after user enters code */}
        {discount && (
          <div
            className={`${styles.summary__line} ${styles.summary__line__discount}`}
          >
            <span>Discount ({discount.code})</span>
            {/* <span>−${discountAmount.toFixed(2)}</span> */}
          </div>
        )}

        {/* Discount code */}
        <div className={styles.discount}>
          <p className={styles.discount_label}>Discount code</p>

          
        </div>
      </div>
    </div>
  );
}

function Item({ itemObj }) {
  return (
    <div className={styles.item}>
      {/* Image */}
      <Link to={``} className={styles.item__img_link}>
        <img
          src={itemObj.images[0]}
          className={styles.item__img}
          alt={itemObj.name}
        />
      </Link>

      {/* info */}
      <div className={styles.item__info}>
        {/* item name */}
        <Link to={``} className={styles.item__name}>
          {itemObj.name}
        </Link>

        {/* item variant */}
        {itemObj.variant && (
          <p className={styles.item__variant}>Variant: {itemObj.variant}</p>
        )}

        {/* item price */}
        <p className={styles.item__unit_price}>
          ${itemObj.price.toFixed(2)} each
        </p>
      </div>

      {/* quantity + button */}
      <div className={styles.item__controls}>
        <div className={styles.qty_control}>
          {/* decrease btn */}
          <button className={styles.qty_val} aria-label="decrease">
            -
          </button>

          {/* quantity value */}
          <span className={styles.qty_val}>{itemObj.quantity}</span>

          {/* increase btn */}
          <button className={styles.qty_val} aria-label="increase">
            +
          </button>
        </div>

        {/* item total */}
        <p className={styles.item__total}>
          ${(itemObj.price * itemObj.quantity).toFixed(2)}
        </p>

        {/* delete icon */}
        <DeleteIcon size={20} className={styles.remove_btn} />
      </div>
    </div>
  );
}

export default Cart;
