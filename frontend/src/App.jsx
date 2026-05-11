import { CartProvider } from './context/cartContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './router/AppRouter';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
