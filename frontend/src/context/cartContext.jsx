import { createContext, useContext, useEffect, useReducer } from 'react';

const cartContext = createContext(null);

const initialState = {
  items: [],
};

function reducer(state, action) {
  console.log(action);

  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [currentState, dispatch] = useReducer(reducer, initialState);

  const totalItems = currentState.items.length;

  useEffect(() => {
    console.log(currentState, totalItems);
  }, [currentState, totalItems]);

  function addToCart(productObj) {
    dispatch({ type: 'ADD_TO_CART', payload: productObj });
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
