import { createContext, useContext, useReducer } from 'react';

const ThemeContext = createContext(null);

function getInitialTheme() {
  const savedTheme = localStorage.getItem('tradevo_theme');
  if (!savedTheme) return 'light';
  return savedTheme;
}

const initialState = {
  theme: getInitialTheme(),
};

function themeReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_THEME': {
      if (state.theme === 'light') return { ...state, theme: 'dark' };
      if (state.theme === 'dark') return { ...state, theme: 'system' };
      if (state.theme === 'system') return { ...state, theme: 'light' };

      return state;
    }

    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  const [{ theme }, dispatch] = useReducer(themeReducer, initialState);

  return <ThemeContext.Provider>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside<ThemeProvider>');
  return context;
}
