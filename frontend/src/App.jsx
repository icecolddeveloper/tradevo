import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './router/AppRouter';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
