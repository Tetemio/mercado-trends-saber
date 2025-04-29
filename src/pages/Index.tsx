
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  // This will only be shown momentarily before the redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ml-primary mb-4 mx-auto"></div>
        <h1 className="text-xl">Redirecionando...</h1>
      </div>
    </div>
  );
};

export default Index;
