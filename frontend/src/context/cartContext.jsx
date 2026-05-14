import { createContext, useContext, useEffect, useReducer } from 'react';

const cartContext = createContext(null);

const initialState = {
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productObj, quantity = 1, variant = null } = action.payload;

      const itemKey = variant
        ? `${productObj.id}-${variant}`
        : `${productObj.id}`; // string

      const isExisting = state.items.find(
        (itemObj) => String(itemObj.id) === itemKey,
      );

      if (isExisting) {
        return {
          ...state,

          items: state.items.map((itemObj) =>
            itemObj === isExisting
              ? { ...itemObj, quantity: itemObj.quantity + quantity }
              : itemObj,
          ),
        };
      } else {
        return {
          ...state,

          items: [
            ...state.items,

            { ...productObj, itemKey, quantity, variant },
          ],
        };
      }
    }

    case 'DELETE_ITEM':
      return {
        ...state,

        items: state.items.filter(
          (itemObj) => itemObj.itemKey !== action.payload,
        ),
      };

    case 'DECREASE_QUANTITY': {
      const itemObj = action.payload;
      const { itemKey, quantity } = itemObj;

      // if quantity is 1 → remove item
      if (quantity === 1) {
        return {
          ...state,

          items: state.items.filter((itemObj) => itemObj.itemKey !== itemKey),
        };
      } else {
        // otherwise decrease quantity
        return {
          ...state,

          items: state.items.map((itemObj) =>
            itemObj.itemKey === itemKey
              ? { ...itemObj, quantity: quantity - 1 }
              : itemObj,
          ),
        };
      }
    }

    case 'INCREASE_QUANTITY': {
      const itemObj = action.payload;
      const { itemKey, quantity } = itemObj;

      return {
        ...state,

        items: state.items.map((itemObj) =>
          itemObj.itemKey === itemKey
            ? { ...itemObj, quantity: quantity + 1 }
            : itemObj,
        ),
      };
    }

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [currentState, dispatch] = useReducer(reducer, initialState);

  const totalItems = currentState.items.length;

  useEffect(() => {
    console.log(currentState);
  }, [currentState, totalItems]);

  function addToCart(productObj, quantity = 1, variant = null) {
    dispatch({
      type: 'ADD_ITEM',
      payload: { productObj, quantity, variant },
    });
  }

  function handleDelete(itemKey) {
    dispatch({ type: 'DELETE_ITEM', payload: itemKey });
  }

  function handleQtyDecrease(itemObj) {
    dispatch({ type: 'DECREASE_QUANTITY', payload: itemObj });
  }

  function handleQtyIncrease(itemObj) {
    dispatch({ type: 'INCREASE_QUANTITY', payload: itemObj });
  }

  return (
    <cartContext.Provider
      value={{
        items: currentState.items,
        currentState,
        addToCart,
        totalItems,
        handleDelete,
        handleQtyDecrease,
        handleQtyIncrease,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

function useCart() {
  const context = useContext(cartContext);
  if (!context)
    throw new Error('useCart hook must be called within the <CartProvider>');
  return context;
}

export { CartProvider, useCart };
