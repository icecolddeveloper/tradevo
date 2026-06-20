import { createContext, useContext, useEffect, useReducer } from 'react';

const cartContext = createContext(null);

const initialState = {
  items: [],
  discount: null,
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

    case 'CLEAR_CART':
      return {
        ...state,

        items: [],
      };

    case 'DELETE_SELECTED_ITEMS': {
      const selectedItems = action.payload;
      const selectedItemsKeys = selectedItems.map((itemObj) => itemObj.itemKey);


      return {
        ...state,

        items: state.items.filter(
          (itemObj) => !selectedItemsKeys.includes(itemObj.itemKey), // call includes on an array
        ),
      };
    }

    case 'APPLY_DISCOUNT': {
      const discountObj = action.payload;

      return {
        ...state,

        discount: discountObj,
      };
    }

    case 'REMOVE_DISCOUNT': {
      return {
        ...state,

        discount: null,
      };
    }

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state.items);

  const totalItems = state.items.length;

  useEffect(() => {}, [state, totalItems]);

  function handleDeleteSelected(selected) {
    dispatch({ type: 'DELETE_SELECTED_ITEMS', payload: selected });
  }

  function addToCart(productObj, quantity = 1, variant = null) {
    dispatch({
      type: 'ADD_ITEM',
      payload: { productObj, quantity, variant },
    });
  }

  function handleClearCart() {
    dispatch({ type: 'CLEAR_CART' });
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

  function handleGetSubTotal() {
    return state.items.reduce(
      (acc, itemObj) => acc + itemObj.price * itemObj.quantity,
      0,
    );
  }

  function handleApplyDiscount(discountObj) {
    dispatch({ type: 'APPLY_DISCOUNT', payload: discountObj });
  }

  function discountAmount() {
    if (!state.discount) return 0;
    const { value, type } = state.discount;
    const percentDiscount = value / 100;
    const subTotal = handleGetSubTotal();

    if (type === 'percent') return subTotal * percentDiscount;

    if (type === 'fixed') return Math.min(state.discount.value, subTotal); // use subtotal when user buys an item very low e.g. $2

    return 0;
  }

  const total = Math.max(handleGetSubTotal() - discountAmount(), 0);

  function handleRemoveDiscount() {
    dispatch({ type: 'REMOVE_DISCOUNT' });
  }

  return (
    <cartContext.Provider
      value={{
        items: state.items,
        discount: state.discount,
        state,
        addToCart,
        totalItems,
        handleDelete,
        handleClearCart,
        handleQtyDecrease,
        handleQtyIncrease,
        handleGetSubTotal,
        handleDeleteSelected,
        handleApplyDiscount,
        discountAmount,
        total,
        handleRemoveDiscount,
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
