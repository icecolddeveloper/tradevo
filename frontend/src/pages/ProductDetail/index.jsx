import { Link, useParams } from 'react-router-dom';
import { getProductBySlug } from '../../data/mockProducts';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import styles from './ProductDetail.module.css';
import ArrowRight from '../../ui/icons/common/ArrowRight';
import NextArrow from '../../ui/icons/common/NextArrow';

function ProductDetail() {
  const { slug } = useParams(); // derive from the url e.g. prosound-wireless-headphones-x1
  const [activeImage, setActiveImage] = useState(0);
  const productObj = getProductBySlug(slug);

  const imageArrLength = productObj.images.length;

  // React swipable
  const handlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
  });

  function handleNextImage() {
    setActiveImage((cur) =>
      cur === imageArrLength - 1 ? imageArrLength - 1 : cur + 1,
    );
  }

  function handlePrevImage() {
    setActiveImage((cur) => (cur === 0 ? 0 : cur - 1));
  }

  const categoryLabel =
    productObj.category.charAt(0).toLocaleUpperCase() +
    productObj.category.slice(1);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <div className={styles.breadcrumb__group}>
            <Link to="/" className={styles.breadcrumb__link}>
              Home
            </Link>
            <NextArrow className={styles.next__arrow} size={15} />
          </div>

          <div className={styles.breadcrumb__group}>
            <Link to="/shop" className={styles.breadcrumb__link}>
              Shop
            </Link>
            <NextArrow className={styles.next__arrow} size={15} />
          </div>

          <div className={styles.breadcrumb__group}>
            <Link
              to={`/shop/${categoryLabel}`}
              className={styles.breadcrumb__link}
            >
              {categoryLabel}
            </Link>
            <NextArrow className={styles.next__arrow} size={15} />
          </div>

          <span className={styles.breadcrumb__current}>{productObj.name}</span>
        </nav>

        {/* Main product section */}
        <div className={styles.product}>
          {/* Image gallery */}
          <div className={styles.gallery}>
            {/* Main image */}
            <div className={styles.gallery__main}>
              <img
                src={productObj.images[activeImage]}
                alt=""
                className={styles.gallery__img}
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
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`${productObj.name}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
