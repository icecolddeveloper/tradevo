import CartIcon from '../../ui/icons/navigation/CartIcon';
import styles from './ProductDetail.module.css';

function ProductInfo({
  productObj,
  categoryLabel,
  quantity,
  handleDecreaseQty,
  handleIncreaseQty,
  addToCart,
}) {
  return (
    <div className={styles.info}>
      <p className={styles.info__category}>{categoryLabel}</p>
      <h1 className={styles.info__name}>{productObj.name}</h1>

      {/* Price */}
      <div className={styles.info__price_block}>
        {/* Discounted price */}
        <span className={styles.info__price}>${productObj.price}</span>

        {productObj.originalPrice > productObj.price && (
          <>
            {/* Original price */}
            <span className={styles.info__original_price}>
              ${productObj.originalPrice}
            </span>

            {/* Saved amount */}
            <span className={styles.info__savings_price}>
              -{productObj.discount && productObj.discount + '%'} now | Save $
              {(productObj.originalPrice - productObj.price).toFixed(2)}
            </span>
          </>
        )}
      </div>

      {/* Short desc */}
      <p className={styles.info__desc}>{productObj.description}</p>

      {/* Quantity selector */}
      <div className={styles.info__qty_row}>
        <span className={styles.info__qty_label}>Quantity</span>

        {/* Container */}
        <div className={styles.qty_control}>
          {/* Decrememnt */}
          <button
            className={styles.qty_btn}
            onClick={handleDecreaseQty}
            aria-label="Decrease quantity"
          >
            −
          </button>

          {/* Current count */}
          <span className={styles.qty_value}>{quantity}</span>

          {/* Increment */}
          <button
            className={styles.qty_btn}
            onClick={handleIncreaseQty}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA buttons */}
      <div className={styles.info__actions}>
        <button className={styles.btn_primary}>
          {productObj.inStock ? (
            <span
              className={styles.btn__primary_a}
              onClick={() => addToCart(productObj, quantity)}
            >
              <CartIcon size={20} /> Add to Cart
            </span>
          ) : (
            'Out of Stock'
          )}
        </button>

        <button className={styles.btn_secondary}>Buy Now</button>
      </div>

      {/* Hashtags */}
      <div className={styles.info__tags}>
        {productObj.tags.map((tagName) => (
          <span key={tagName} className={styles.tag}>
            #{tagName}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProductInfo;
