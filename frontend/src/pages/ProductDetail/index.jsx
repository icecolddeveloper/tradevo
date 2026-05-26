import { useProductDetail } from '../../hooks/useProductDetail';
import styles from './ProductDetail.module.css';
import Breadcrumb from './Breadcrumb';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';

function ProductDetail() {
  const {
    productObj,
    imageArrLength,
    addToCart,
    categoryLabel,
    relatedProducts,
    activeImage,
    activeTab,
    quantity,
    isAuthenticated,
    handlers,
    handleImgLoad,
    handleImageSelect,
    handleDecreaseQty,
    handleIncreaseQty,
    handleTabSelect,
  } = useProductDetail();

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumb categoryLabel={categoryLabel} />

        {/* Main product section */}
        <div className={styles.product}>
          <ProductGallery
            productObj={productObj}
            activeImage={activeImage}
            handleImgLoad={handleImgLoad}
            handlers={handlers}
            imageArrLength={imageArrLength}
            handleImageSelect={handleImageSelect}
          />

          <ProductInfo
            productObj={productObj}
            categoryLabel={categoryLabel}
            quantity={quantity}
            handleDecreaseQty={handleDecreaseQty}
            handleIncreaseQty={handleIncreaseQty}
            addToCart={addToCart}
          />
        </div>

        <ProductTabs
          productObj={productObj}
          activeTab={activeTab}
          handleTabSelect={handleTabSelect}
          isAuthenticated={isAuthenticated}
        />

        {/* Related products */}
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </div>
  );
}

export default ProductDetail;
