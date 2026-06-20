import { CartProvider } from './context/cartContext';
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import AppRouter from './router/AppRouter';
import './styles/global.css';

function App() {
  return (
    <FilterProvider>
      <ThemeProvider>
        <WishlistProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </WishlistProvider>
      </ThemeProvider>
    </FilterProvider>
  );
}

export default App;
