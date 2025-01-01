import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface WithAuthOptions {
  redirectPath?: string;
}

const withAuth = (WrappedComponent: React.ComponentType, options: WithAuthOptions = {}) => {
  return (props: any) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { redirectPath = '/login' } = options;

    useEffect(() => {
      if (!isLoggedIn) {
        navigate(redirectPath);
      }
    }, [isLoggedIn, navigate, redirectPath]);

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
