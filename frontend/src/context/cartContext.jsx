import { createContext, useContext, useReducer } from 'react';

const cartContext = createContext(null);

const initialState = {
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, 'done'],
      };
  }
}

function CartProvider({ children }) {
  const [currentState, dispatch] = useReducer(reducer, initialState);

  console.log(currentState);

  return (
    <cartContext.Provider value={{ currentState, dispatch }}>
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
