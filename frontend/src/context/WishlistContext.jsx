import { useReducer } from 'react';
import { createContext, useContext } from 'react';

const initialState = {};

function wishlistReducer() {}

const WishlistContext = createContext(null);

function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  return <WishlistContext.Provider>{children}</WishlistContext.Provider>;
}

function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error('useWishlist must be used inside <WishlistProvider />');
  return context;
}

export { WishlistProvider, useWishlist };
