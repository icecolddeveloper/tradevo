import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import styles from './ListItem.module.css';
import DeleteIcon from '../../ui/icons/common/DeleteIcon';
import SelectCheckIcon from '../../ui/icons/common/SelectCheckIcon';

function ListItem({
  itemObj,
  multipleSelect,
  selected,
  handleItemSelect,
  isCartComponent,
  isWishlistComponent,
}) {
  const { addToCart, handleDelete, handleQtyDecrease, handleQtyIncrease } =
    useCart();
  const isSelected = selected?.some((item) => item.itemKey === itemObj.itemKey); // true or false

  console.log(itemObj);

  function handleAddToCart() {
    addToCart(itemObj);
  }

  return (
    <div className={styles.item__row_container}>
      {multipleSelect && (
        <SelectCheckIcon
          multipleSelect={multipleSelect}
          isSelected={isSelected}
          handleItemSelect={() => handleItemSelect(itemObj)}
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

          {isWishlistComponent && (
            <div className={styles.wishlist_control_btns}>
              <button className={styles.btn_primary} onClick={handleAddToCart}>
                Add to cart
              </button>

              <button className={styles.btn_secondary}>Remove</button>
            </div>
          )}
        </div>

        {/* quantity + button */}
        <div className={styles.item__controls}>
          {isCartComponent && (
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
          )}

          {/* item total */}
          {isCartComponent && (
            <p className={styles.item__total}>
              ${(itemObj.price * itemObj.quantity).toFixed(2)}
            </p>
          )}

          {/* delete icon */}
          {isCartComponent && (
            <DeleteIcon
              size={20}
              className={styles.remove_btn}
              handleDelete={() => handleDelete(itemObj.itemKey)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
