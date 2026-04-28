import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const THEME_KEY = 'tradevo-theme';

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme ? savedTheme : 'light';
}

const initialState = {
  theme: getInitialTheme(),
};

function themeReducer(state, action) {
  console.log(action.payload);
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    default:
      break;
  }
}

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [{ theme }, dispatch] = useReducer(themeReducer, initialState);

  /* 
    This effect figures out the ACTUAL applied theme (resolving 'system')
    and sets data-theme on the <html> element. 
  */
  useEffect(
    function () {
      const htmlRoot = document.documentElement; // the <html> element

      let applied = theme;

      if (applied === 'system') {
        // Read device preferred color mode
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;

        applied = prefersDark ? 'dark' : 'light'; // applied can only be light/dark
      }

      htmlRoot.setAttribute('data-theme', applied); // applied === light/dark
      localStorage.setItem(THEME_KEY, theme); // theme === light/dark/system
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}

export { ThemeProvider, useTheme };

{
  /*
  1) Component initalizes & theme has an initial value e.g. 'light'
      const [state, dispatch] = useReducer(themeReducer, initialState);
      const { theme } = state;

  2) React runs effects after render 
      useEffect(..., [theme]) ----> runs immediately

  3) First Effect executes (apply theme)
      Flow inside:

      i.    Take current theme
      ii.   If "system" → check OS
      iii.  Decide actual theme (applied)
      iv.   Apply to DOM (data-theme)
      v.    Save to localStorage

      
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  */
}
