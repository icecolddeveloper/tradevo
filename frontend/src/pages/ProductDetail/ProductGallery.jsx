import HeartIcon from '../../ui/icons/navigation/HeartIcon';
import styles from './ProductDetail.module.css';

function ProductGallery({
  productObj,
  activeImage,
  handleImgLoad,
  handlers,
  imageArrLength,
  handleImageSelect,
}) {
  return (
    <div className={styles.gallery}>
      {/* Main image */}
      <div className={styles.gallery__main}>
        {/* Skeleton while image loads */}

        <img
          src={productObj.images[activeImage]}
          alt=""
          className={styles.gallery__img}
          onLoad={handleImgLoad}
          {...handlers}
        />

        {/* Badges on main image */}
        {/* <div className={styles.gallery__badges}>
          {productObj.isFlashDeal && (
            <span className={styles.badge_deal}>🔥 Flash Deal</span>
          )}

          {productObj.discount > 0 && (
            <span className={styles.badge_discount}>
              -{productObj.discount}%
            </span>
          )}
        </div> */}

        {/* Current count */}
        <div className={styles.current__image__badge}>
          Item {activeImage + 1} / {imageArrLength}
        </div>

        {/* WishList icon */}
        <div className={styles.heart__icon__wrap}>
          <HeartIcon className={styles.heart__icon} size={20} />
        </div>

        {/* Out of stock */}
        {!productObj.inStock && (
          <div className={styles.gallery__out_of_stock}>Out of Stock</div>
        )}
      </div>

      {/* Thumbnails */}
      <div className={styles.gallery__thumbs}>
        {productObj.images.map((img, i) => (
          <button
            key={i}
            className={`${styles.gallery__thumb} ${activeImage === i ? styles.gallery__thumb__active : ''}`}
            onClick={() => handleImageSelect(i)}
          >
            <img src={img} alt={`${productObj.name}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
