import './App.css';
import SignUpLogin from './auth/SignUpLogin';
import HomePage from './features/HomePage/HomePage.tsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header.tsx";

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/login" element={<SignUpLogin />} />
          <Route path="/register" element={<SignUpLogin />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
