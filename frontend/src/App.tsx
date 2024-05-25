import './App.css';
import HomePage from './features/HomePage/HomePage.tsx';
import {AuthProvider} from "./hooks/useAuth.tsx";

const App = () => {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
};

export default App;
