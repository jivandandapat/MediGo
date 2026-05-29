import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import {
  LayoutDashboard,
  ShoppingBag,
  Pill,
  History,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
} from 'lucide-react';

import logo from '../assets/images/logo.png';

// ── Declared OUTSIDE the main component to avoid re-creation on render ──
interface SidebarContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ activeTab, onTabChange, onLogout, userName }) => (
  <>
    <div>
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MediGo Logo" className="h-14 w-14 object-contain" />
          <h1 className="text-2xl font-bold text-slate-900">
            Medi<span className="text-emerald-500">Go</span>
          </h1>
        </div>
        <span className="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-400">
          Patient Portal
        </span>
      </div>

      <nav className="space-y-1">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          Dashboard
        </button>

        <button
          onClick={() => onTabChange('orders')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'orders' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="h-5 w-5 shrink-0" />
          My Orders
        </button>

        <button
          onClick={() => onTabChange('prescriptions')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'prescriptions' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Pill className="h-5 w-5 shrink-0" />
          Prescriptions
        </button>

        <button
          onClick={() => onTabChange('history')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'history' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <History className="h-5 w-5 shrink-0" />
          Medical History
        </button>
      </nav>
    </div>

    <div className="border-t border-slate-100 pt-4">
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold shrink-0">
          {userName?.charAt(0)}
        </div>
        <div className="truncate">
          <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
          <p className="text-xs text-slate-400">Patient Account</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-600 hover:bg-rose-50 transition-all"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        Logout
      </button>
    </div>
  </>
);

// ── Main Component ──
const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Proper user handling
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // History cleanup(It removes previous login history, stabilizes browser navigation, and prevents back/forward authentication glitches.)
  useEffect(() => {

    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

   
     // ADD THIS — blocks forward button restoring cached page
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !localStorage.getItem('token')) {
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener("popstate", handleBackButton);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      window.removeEventListener("pageshow", handlePageShow);
    };

  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', {replace: true});
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">

      {/* DESKTOP Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col justify-between p-5 shrink-0">
        <SidebarContent activeTab={activeTab} onTabChange={handleTabChange} onLogout={logout} userName={user?.name} />
      </aside>

      {/* MOBILE Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MOBILE Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-5 transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent activeTab={activeTab} onTabChange={handleTabChange} onLogout={logout} userName={user?.name} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto min-w-0">

        <header className="h-16 sm:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-all shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <button className="p-2 bg-slate-50 rounded-xl relative shrink-0 hover:bg-slate-100 transition-all">
            <Bell className="h-5 w-5" />
          </button>
        </header>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Welcome back, {user?.name || 'User'}!
            </h2>
            <p className="text-sm sm:text-base">Your dashboard is ready.</p>
          </div>
        </div>

      </main>

    </div>
  );
};

export default UserDashboard;