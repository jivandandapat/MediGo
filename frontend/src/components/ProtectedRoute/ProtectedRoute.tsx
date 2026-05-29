import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {

  const navigate = useNavigate();

  // null = still verifying, true = valid, false = invalid
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {

    // block back button inside dashboard
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // block forward button restoring cached dashboard page
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !localStorage.getItem('token')) {
        navigate('/login', { replace: true });
      }
    };
    window.addEventListener('pageshow', handlePageShow);

    // verify token with backend
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      // no token found
      if (!token) {
        setIsVerified(false);
        return;
      }

      try {
        const res = await fetch('/api/user/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          // token is valid
          setIsVerified(true);
        } else {
          // token is tampered or expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsVerified(false);
        }

      } catch {
        // network/server error
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsVerified(false);
      }
    };

    verifyToken();

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.onpopstate = null;
    };

  }, [navigate]);

  // still verifying — show loader
  if (isVerified === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm">Verifying session...</p>
      </div>
    );
  }

  // token invalid or tampered
  if (!isVerified) {
    return <Navigate to="/login" replace />;
  }

  // wrong role → go to home
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;