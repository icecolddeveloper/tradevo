import { createContext, useContext, useState } from 'react';
import { useCart } from './cartContext';

/* ============================================================
   TRADEVO — WishlistContext
   Mirrors cartContext patterns. Holds saved products and
   exposes add/remove/move-to-cart actions to any component.
   ============================================================ */

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();

  const totalItems = items.length;

  function isInWishlist(productId) {
    return items.some((item) => item.id === productId);
  }

  function handleAddToWishlist(productObj) {
    setItems((prev) => {
      const alreadySaved = prev.some((item) => item.id === productObj.id);
      if (alreadySaved) return prev; // avoid duplicates
      return [...prev, productObj];
    });
  }

  function handleRemoveFromWishlist(productId) {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function handleToggleWishlist(productObj) {
    const alreadySaved = items.some((item) => item.id === productObj.id);
    if (alreadySaved) {
      handleRemoveFromWishlist(productObj.id);
    } else {
      handleAddToWishlist(productObj);
    }
  }

  function handleMoveToCart(productObj) {
    addToCart(productObj, 1);
    handleRemoveFromWishlist(productObj.id);
  }

  function handleRemoveSelected(selectedItems) {
    const selectedIds = selectedItems.map((item) => item.id);
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
  }

  function handleClearWishlist() {
    setItems([]);
  }

  const value = {
    items,
    totalItems,
    isInWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleToggleWishlist,
    handleMoveToCart,
    handleRemoveSelected,
    handleClearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used inside <WishlistProvider>');
  }
  return context;
}