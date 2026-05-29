import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import menuIcon from '../../assets/icons/menu.png';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const showLogin = pathname === '/signup';
  const [menuOpen, setMenuOpen] = useState(false);

  // use state so navbar re-renders when token changes
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ role?: string }>({});

  // read localStorage on every route change
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setToken(storedToken);
    setUser(storedUser);
  }, [pathname]); // re-runs every time route changes

  // redirect to correct dashboard based on role
  const goToDashboard = () => {
    if (user.role === 'admin') navigate('/admin-dashboard', { replace: true });
    else if (user.role === 'shop_owner') navigate('/shop-dashboard', { replace: true });
    else navigate('/user-dashboard', { replace: true });
  };

  const navClass = 'block rounded-md px-2 py-1 transition hover:opacity-80 active:bg-red-700';
  const btnClass = 'rounded-full bg-white/20 px-4 py-1.5 transition hover:bg-white/30';

  return (
    <nav className="top-0 left-0 z-50 w-full bg-linear-to-r from-[#00A19D] to-[#00E5BC] px-4 py-3 text-white shadow-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MediGo logo" className="h-10 w-10 object-contain" />
          <h1 className="text-xl font-bold tracking-wide sm:text-2xl">MediGo</h1>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <img src={menuIcon} alt="" className="h-5 w-7 object-contain brightness-0 invert" />
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 text-[15px] font-medium md:flex lg:gap-7">
          <Link to="/" className={navClass}>Home</Link>
          <a href="#about" className={navClass}>About</a>
          <a href="#contact" className={navClass}>Contact</a>

          {/* logged in → Dashboard, logged out → Signup/Login */}
          {token ? (
            <button onClick={goToDashboard} className={btnClass}>
              Dashboard
            </button>
          ) : (
            <Link to={showLogin ? '/login' : '/signup'} className={btnClass}>
              {showLogin ? 'Login' : 'Signup'}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-xl bg-black/10 p-3 text-sm font-medium md:hidden">
          <Link to="/" className={navClass} onClick={() => setMenuOpen(false)}>Home</Link>
          <a href="#about" className={navClass} onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" className={navClass} onClick={() => setMenuOpen(false)}>Contact</a>

          {token ? (
            <button
              onClick={() => { goToDashboard(); setMenuOpen(false); }}
              className="rounded-full bg-white/20 px-4 py-2 text-center transition hover:bg-white/30"
            >
              Dashboard
            </button>
          ) : (
            <Link
              to={showLogin ? '/login' : '/signup'}
              className="rounded-full bg-white/20 px-4 py-2 text-center transition hover:bg-white/30"
              onClick={() => setMenuOpen(false)}
            >
              {showLogin ? 'Login' : 'Signup'}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};