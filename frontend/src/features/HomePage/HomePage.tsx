import Header from '../../components/Header/Header.tsx';
import MainContent from '../MainContent/MainContent.tsx';
import { useAuth } from "../../hooks/useAuth.tsx";
import SignUpLogin from "../../auth/SignUpLogin.tsx";

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  console.log(isLoggedIn);
  
  return (
    <div>
          <Header />
      {
        !isLoggedIn
        ? <SignUpLogin />
        : (<div>
        <MainContent />
        </div>)
      }
    </div>
  );
};

export default HomePage;