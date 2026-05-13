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

  return (
    <cartContext.Provider value={{ currentState, addToCart, totalItems }}>
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
