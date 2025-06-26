import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="text-center">
    {/* Loader/Icon Area */}
    <div className="mb-6">
      {/* Could be a subtle spinning circle that morphs into a checkmark */}
      <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto" viewBox="0 0 24 24">
        {/* Spinner path */}
      </svg>
    </div>
    <h1 className="text-4xl font-light text-gray-800 tracking-wide">
      Signing You Out
    </h1>
    <p className="mt-3 text-lg text-gray-500">
      See you next time!
    </p>
  </div>
</div>
  );
}

export default LogoutPage;