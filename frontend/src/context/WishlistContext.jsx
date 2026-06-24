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

    case 'REMOVE_SELECTED': {
      const arrOfselected = action.payload;
      const idsOfSelected = arrOfselected.map((itemObj) => itemObj.id);

      return {
        ...state,
        items: state.items.filter(
          (itemObj) => !idsOfSelected.includes(itemObj.id),
        ),
      };
    }

    case 'CLEAR': {
      return {
        ...state,
        items: [],
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

  function setRemoveFromWishlist(itemObj) {
    dispatch({ type: 'REMOVE_ITEM', payload: itemObj });
  }

  function setRemoveSelected(selectedItems) {
    dispatch({ type: 'REMOVE_SELECTED', payload: selectedItems });
  }

  function setClear() {
    dispatch({ type: 'CLEAR' });
  }

  return (
    <WishlistContext.Provider
      value={{
        wishListItems: state.items,
        setAddToWishlist,
        setRemoveFromWishlist,
        setRemoveSelected,
        setClear,
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
