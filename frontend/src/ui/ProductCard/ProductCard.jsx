import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import styles from './ProductCard.module.css';
import HeartIcon from '../icons/navigation/HeartIcon';
import CartIcon from '../icons/navigation/CartIcon';
import CheckIcon from '../icons/common/CheckIcon';
import { useWishlist } from '../../context/WishlistContext';

/* ============================================================
   TRADEVO — ProductCard
   The most reused component in the app. Appears on:
   Home page, Shop page, Wishlist page, Related Products.
   ============================================================ */
function ProductCard({ productObj, showWishlistIcon }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { addToCart } = useCart();
  const { setAddToWishlist } = useWishlist();

  function handleAddToCart(e) {
    e.preventDefault(); // don't navigate to product page
    addToCart(productObj, 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  }

  function handleAddToWishlist(e) {
    e.preventDefault();
    setAddToWishlist(productObj);
  }

  return (
    <div className={styles.card}>
      <Link to={`/product/${productObj.slug}`} className={styles.card__link}>
        {/* ──────────  Image area ──────────── */}
        <div className={styles.card__image_wrap}>
          {/* Skeleton while image loads */}
          {!imgLoaded && (
            <div className={`${styles.card__image_skeleton}`}>
              <div className={styles.skeleton__content}>No image</div>
            </div>
          )}

          <img
            src={productObj.thumbnail || productObj.images[0]}
            className={`${styles.card__image}`}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
          />

          <div className={styles.card__badges}>
            {/* isFlashDeal */}
            {productObj.isFlashDeal && (
              <span
                className={`${styles.card__badge} ${styles.card__badge__deal}`}
              >
                🔥 Deal
              </span>
            )}

            {/* isNew */}
            {productObj.isNew && (
              <span
                className={`${styles.card__badge} ${styles.card__badge__new}`}
              >
                New
              </span>
            )}

            {/* isDiscounted */}
            {productObj.discount > 0 && (
              <span
                className={`${styles.card__badge} ${styles.card__badge__discount}`}
              >
                -{productObj.discount}%
              </span>
            )}
          </div>

          {showWishlistIcon && (
            <button
              className={`${styles.card__wishlist}`}
              onClick={handleAddToWishlist}
            >
              <HeartIcon size={17} />
            </button>
          )}

          {/* Out of stock overlay */}
          {!productObj.inStock && (
            <div className={styles.card__out_of_stock}>
              <span>Out of stock</span>
            </div>
          )}
        </div>

        {/* ───────── Content area ───────----- */}
        <div className={styles.card__body}>
          <p className={styles.card__category}>{productObj.category}</p>
          <h3 className={styles.card__name}>{productObj.name}</h3>

          <div className={styles.card__price_row}>
            <span className={styles.card__price}>
              ${productObj.price.toFixed(2)}
            </span>
            {productObj.originalPrice > productObj.price && (
              <span className={styles.card__original_price}>
                ${productObj.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className={styles.card__footer}>
        <button
          className={`${styles.card__add_btn} ${addedFeedback ? styles.card__add_btn__added : ''}`}
          onClick={handleAddToCart}
        >
          {addedFeedback ? (
            <div className={styles.cart__wrapper}>
              <CheckIcon size={18} />
              Added!
            </div>
          ) : (
            <div className={styles.cart__wrapper}>
              <CartIcon size={18} />
              Add to cart
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
