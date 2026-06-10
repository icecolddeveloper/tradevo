import { createContext, useContext, useReducer } from 'react';

/* ============================================================
   TRADEVO — FilterContext
   Manages all product filtering and sorting state for the Shop page.
   Uses useReducer because filter state has many fields that
   change together — useReducer keeps it organized.
   ============================================================ */
const initialState = {
  page: 1,
  category: 'all',
  sortBy: 'newest',
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE': {
      return {
        ...state,
        page: action.payload,
      };
    }

    case 'SET_CATEGORY': {
      return {
        ...state,
        category: action.payload,
      };
    }

    case 'SET_SORT': {
      return {
        ...state,
        sortBy: action.payload,
      };
    }

    case 'RESET_FILTERS': {
      return {
        ...initialState,
      };
    }
  }
}

const FilterContext = createContext(null);

function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  function setPage(page) {
    dispatch({ type: 'SET_PAGE', payload: page });
  }

  function setCategory(category) {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }

  function setSort(sort) {
    dispatch({ type: 'SET_SORT', payload: sort });
  }

  return (
    <FilterContext.Provider value={{ ...state, setPage, setCategory, setSort }}>
      {children}
    </FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error('useFilter must be used inside <FilterProvider>');
  return context;
}

export { FilterProvider, useFilter };
