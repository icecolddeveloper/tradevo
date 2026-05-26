import ProductCard from '../../ui/ProductCard/ProductCard';
import styles from './ProductDetail.module.css';

function RelatedProducts({ relatedProducts }) {
  return (
    <>
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
    </>
  );
}

export default RelatedProducts;
