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
  return savedTheme ? savedTheme : 'dark';
}

const initialState = {
  theme: getInitialTheme(),
};

function themeReducer(state, action) {
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

  useEffect(
    function () {
      if (theme !== 'system') return; // only proceed if theme === 'system'

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      function handleAutoChange(e) {
        const htmlRoot = document.documentElement;

        htmlRoot.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }

      mediaQuery.addEventListener('change', handleAutoChange);

      return () => mediaQuery.removeEventListener('change', handleAutoChange);
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
