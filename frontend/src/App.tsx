import './App.css';
import SignUpLogin from './auth/SignUpLogin';
import HomePage from './features/HomePage/HomePage.tsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.tsx';
import { useState } from "react";

const App = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const handleNotFoundPage = () => {
    setHideHeader(true);
  };

  return (
    <div>
      <Router>
        {
          !hideHeader
          ? <Header />
          : null
        }
        <Routes>
          <Route path="/login" element={<SignUpLogin />} />
          <Route path="/register" element={<SignUpLogin />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage onRender={handleNotFoundPage} />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
