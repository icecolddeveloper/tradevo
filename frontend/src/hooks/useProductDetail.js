import { getProductBySlug, getRelatedProducts } from '../data/mockProducts';
import { useCart } from '../context/cartContext';
import { useSwipeable } from 'react-swipeable';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export function useProductDetail() {
  // 1. external hooks first
  const { addToCart } = useCart();
  const { slug } = useParams(); // derive from the url e.g. prosound-wireless-headphones-x1

  // 2. derived data (depends on slug)
  const productObj = getProductBySlug(slug);
  const imageArrLength = productObj.images.length;
  const categoryLabel =
    productObj.category.charAt(0).toLocaleUpperCase() +
    productObj.category.slice(1);
  const relatedProducts = getRelatedProducts(productObj.category, 6);

  // 3. state
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Specs');
  const [quantity, setQuantity] = useState(1);
  const [ setImgLoaded] = useState(false);
  const [isAuthenticated] = useState(true);

  // 4. third party hooks that depend on state/handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
  });

  // 5. handlers
  function handleNextImage() {
    setActiveImage((cur) =>
      cur === imageArrLength - 1 ? imageArrLength - 1 : cur + 1,
    );
  }

  function handlePrevImage() {
    setActiveImage((cur) => (cur === 0 ? 0 : cur - 1));
  }

  function handleImgLoad() {
    setImgLoaded(true);
  }

  function handleImageSelect(i) {
    setActiveImage(i);
  }

  function handleDecreaseQty() {
    setQuantity((q) => Math.max(q - 1, 1));
  }

  function handleIncreaseQty() {
    setQuantity((q) => q + 1);
  }

  function handleTabSelect(tabName) {
    setActiveTab(tabName);
  }

  return {
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
  };
}
