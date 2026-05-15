import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import DeleteIcon from '../../ui/icons/common/DeleteIcon';
import SelectCheckIcon from '../../ui/icons/common/SelectCheckIcon';

function Item({ itemObj, isSelecting, handleItemSelect }) {
  const { handleDelete, handleQtyDecrease, handleQtyIncrease } = useCart();

  return (
    <div className={styles.item__row_container}>
      {isSelecting && (
        <SelectCheckIcon
          isSelecting={isSelecting}
          handleItemSelect={handleItemSelect}
        />
      )}

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
            <button
              className={styles.qty_val}
              aria-label="decrease"
              onClick={() => handleQtyDecrease(itemObj)}
            >
              -
            </button>

            {/* quantity value */}
            <span className={styles.qty_val}>{itemObj.quantity}</span>

            {/* increase btn */}
            <button
              className={styles.qty_val}
              aria-label="increase"
              onClick={() => handleQtyIncrease(itemObj)}
            >
              +
            </button>
          </div>

          {/* item total */}
          <p className={styles.item__total}>
            ${(itemObj.price * itemObj.quantity).toFixed(2)}
          </p>

          {/* delete icon */}
          <DeleteIcon
            size={20}
            className={styles.remove_btn}
            handleDelete={() => handleDelete(itemObj.itemKey)}
          />
        </div>
      </div>
    </div>
  );
}

export default Item;
