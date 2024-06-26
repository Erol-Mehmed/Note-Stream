import MainContent from '../MainContent/MainContent.tsx';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../services/api.ts";
import useAuth from "../../hooks/useAuth.ts";

const HomePage = () => {
  const routeNavigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await api.get('auth/check', {
        withCredentials: true
      });

      if (response.data.isAuthenticated === false) {
        routeNavigate('/login');
      }
    };

    checkAuth().then(r => r);
  }, []);

  if (isLoggedIn) {
    return <MainContent />
  } else {
    return null;
  }
};

export default HomePage;
