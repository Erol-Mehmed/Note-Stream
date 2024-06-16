import MainContent from '../MainContent/MainContent.tsx';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const routeNavigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      routeNavigate('/login');
    }
  }, []);
  
  return (
    <MainContent />
  );
};

export default HomePage;
