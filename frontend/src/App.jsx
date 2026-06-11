import { CartProvider } from './context/cartContext';
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './router/AppRouter';
import './styles/global.css';

function App() {
  return (
    <FilterProvider>
      <ThemeProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </ThemeProvider>
    </FilterProvider>
  );
}

export default App;
