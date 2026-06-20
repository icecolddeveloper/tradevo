import { useReducer } from 'react';
import { createContext, useContext } from 'react';

const initialState = {
  items: [],
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id } = action.payload;

      const isExisting = state.items.find((prodObj) => prodObj.id === id);

      if (isExisting) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }

    default: {
      return state;
    }
  }
}

const WishlistContext = createContext(null);

function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  console.log(state.items);

  function setAddToWishlist(productObj) {
    dispatch({ type: 'ADD_ITEM', payload: productObj });
  }

  return (
    <WishlistContext.Provider
      value={{ wishListItems: state.items, setAddToWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error('useWishlist must be used inside <WishlistProvider />');
  return context;
}

export { WishlistProvider, useWishlist };
