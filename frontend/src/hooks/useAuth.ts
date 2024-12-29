import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.ts';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const routeNavigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await api.get('check-token');

      setIsLoggedIn(response.data.isAuthenticated);
    };

    checkAuth().then((r) => r);
  });

  const logout = async () => {
    await api.post(
      'auth/logout',
      {},
      {
        withCredentials: true,
      },
    );

    setIsLoggedIn(false);
    routeNavigate('/login');
  };

  return { isLoggedIn, setIsLoggedIn, logout };
};

export default useAuth;
