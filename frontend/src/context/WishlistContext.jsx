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

    case 'REMOVE_ITEM': {
      const selectedItemObj = action.payload;
      return {
        ...state,
        items: state.items.filter(
          (itemObj) => itemObj.id !== selectedItemObj.id,
        ),
      };
    }

    default: {
      return state;
    }
  }
}

const WishlistContext = createContext(null);

function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  function setAddToWishlist(productObj) {
    dispatch({ type: 'ADD_ITEM', payload: productObj });
  }

  function setRemoveFromWishlist(arrOfSelected) {
    dispatch({ type: 'REMOVE_ITEM', payload: arrOfSelected });
  }

  return (
    <WishlistContext.Provider
      value={{
        wishListItems: state.items,
        setAddToWishlist,
        setRemoveFromWishlist,
      }}
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
