import MainContent from '../MainContent/MainContent.tsx';
import withAuth from '../../hoc/withAuth.tsx';

const AuthenticatedContent = withAuth(MainContent);

const HomePage = () => {
 return  <AuthenticatedContent />;
};

export default HomePage;
