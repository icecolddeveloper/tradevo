import { Link, useParams } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../../data/mockProducts';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import styles from './ProductDetail.module.css';
import ArrowRight from '../../ui/icons/common/ArrowRight';
import NextArrow from '../../ui/icons/common/NextArrow';
import HeartIcon from '../../ui/icons/navigation/HeartIcon';
import CartIcon from '../../ui/icons/navigation/CartIcon';
import ProductCard from '../../ui/ProductCard/ProductCard';
import { useCart } from '../../context/cartContext';

function ProductDetail() {
  const { addToCart } = useCart();
  const { slug } = useParams(); // derive from the url e.g. prosound-wireless-headphones-x1
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Specs');
  const [quantity, setQuantity] = useState(1);
  const productObj = getProductBySlug(slug);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

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

  const relatedProducts = getRelatedProducts(productObj.category, 6);

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
          </div>
        </nav>

        {/* Main product section */}
        <div className={styles.product}>
          {/* Image gallery */}
          <div className={styles.gallery}>
            {/* Main image */}
            <div className={styles.gallery__main}>
              {/* Skeleton while image loads */}

              <img
                src={productObj.images[activeImage]}
                alt=""
                className={styles.gallery__img}
                onLoad={() => setImgLoaded(true)}
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
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`${productObj.name}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
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
                    -{productObj.discount && productObj.discount + '%'} now |
                    Save $
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
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                {/* Current count */}
                <span className={styles.qty_value}>{quantity}</span>

                {/* Increment */}
                <button
                  className={styles.qty_btn}
                  onClick={() => setQuantity((q) => q + 1)}
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
        </div>

        {/*  Tabs: Description / Specs / Reviews  */}
        <div className={styles.tabs}>
          <div className={styles.tabs__nav}>
            {['Specs', 'Reviews'].map((tabName, idx) => (
              <button
                key={tabName}
                className={`${styles.tab_btn} 
                  ${tabName === activeTab ? styles.tab_btn__active : ''} 
                  ${idx === 0 ? styles.idx_1_tab_btn : ''}`}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </button>
            ))}
          </div>

          <div className={styles.tab_content}>
            {/* Description */}
            {/* {activeTab === 'Description' && (
                <p className={styles.description_text}>
                  {productObj.description}
                </p>
              )} */}

            {/* Specs */}
            {activeTab === 'Specs' && (
              <div className={styles.specs_grid}>
                {Object.entries(productObj.specs).map(([key, val]) => (
                  <div className={styles.spec_row}>
                    <span className={styles.spec_key}>{key}</span>
                    <span className={styles.spec_val}>{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'Reviews' && (
              <div className={styles.reviews}>
                <div className={styles.reviews__empty}>
                  {/* Contents */}
                  <h3 className={styles.reviews__empty__title}>
                    No reviews yet
                  </h3>

                  <p className={styles.reviews__empty__sub}>
                    Be the first to share your experience with this product.
                  </p>

                  {/* CTA */}
                  {isAuthenticated ? (
                    <button className={styles.reviews__write_btn}>
                      Write a Review
                    </button>
                  ) : (
                    <div className={styles.reviews__cta}>
                      <p>
                        Have this product?{' '}
                        <Link
                          to="/login"
                          className={styles.reviews__login_link}
                        >
                          Sign in
                        </Link>{' '}
                        to write the first review.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.related__title}>You might also like</h2>
            <div className={styles.related__grid}>
              {relatedProducts.map((prodObj) => (
                <ProductCard key={prodObj.id} productObj={prodObj} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
