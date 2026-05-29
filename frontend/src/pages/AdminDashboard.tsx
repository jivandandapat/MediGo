import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Users,
  Store,
  DollarSign,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  Menu,
  X,
} from 'lucide-react';

import logo from '../assets/images/logo.png';

// ── Declared OUTSIDE the main component to avoid re-creation on render ──
interface SidebarContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ activeTab, onTabChange, onLogout }) => (
  <>
    <div>
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="MediGo Logo" className="h-20 w-auto object-contain" />
        <h1 className="mt-2 text-2xl font-bold text-white">
          Medi<span className="text-emerald-500">Go</span>
        </h1>
        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">
          System Control HQ
        </span>
      </div>

      <nav className="space-y-1">
        <button
          onClick={() => onTabChange('moderation')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'moderation' ? 'bg-slate-900 text-indigo-400' : 'hover:bg-slate-900/50 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="h-5 w-5 shrink-0" />
          Shop Compliance
        </button>

        <button
          onClick={() => onTabChange('users')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'users' ? 'bg-slate-900 text-indigo-400' : 'hover:bg-slate-900/50 hover:text-slate-200'
          }`}
        >
          <Users className="h-5 w-5 shrink-0" />
          User Accounts
        </button>
      </nav>
    </div>

    <div className="border-t border-slate-900 pt-4">
      <div className="px-4 py-2 mb-2">
        <p className="text-sm font-semibold text-slate-200">Super Administrator</p>
        <p className="text-xs text-indigo-400">Level 1 Security Clearance</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-all"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        Logout
      </button>
    </div>
  </>
);

// ── Main Component ──
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('moderation');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // History cleanup(It removes previous login history, stabilizes browser navigation, and prevents back/forward authentication glitches.)
  useEffect(() => {

    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // ✅ ADD THIS — blocks forward button restoring cached page
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
    navigate('/login', { replace: true });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">

      {/* DESKTOP Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-950 text-slate-400 flex-col justify-between p-5 shrink-0">
        <SidebarContent activeTab={activeTab} onTabChange={handleTabChange} onLogout={logout} />
      </aside>

      {/* MOBILE Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MOBILE Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-950 text-slate-400 flex flex-col justify-between p-5 transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent activeTab={activeTab} onTabChange={handleTabChange} onLogout={logout} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto min-w-0">

        <header className="h-16 sm:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-all shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 truncate">
            System Monitoring Headquarters
          </h1>
        </header>

        <div className="p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-indigo-50 text-indigo-500 rounded-xl shrink-0">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase truncate">Total Patients</p>
                <h4 className="text-lg sm:text-xl font-bold text-slate-800">14,240</h4>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-emerald-50 text-emerald-500 rounded-xl shrink-0">
                <Store className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase truncate">Partner Shops</p>
                <h4 className="text-lg sm:text-xl font-bold text-slate-800">312</h4>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-amber-50 text-amber-500 rounded-xl shrink-0">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase truncate">Platform Revenue</p>
                <h4 className="text-lg sm:text-xl font-bold text-slate-800">$8,490</h4>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-rose-50 text-rose-500 rounded-xl shrink-0">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase truncate">Unresolved Disputes</p>
                <h4 className="text-lg sm:text-xl font-bold text-rose-600">4 Alerts</h4>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="p-4 sm:p-6 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Pharmacy Verification Log</h3>
              <p className="text-xs text-slate-400 mt-1">
                Approve license credentials of new medical entities prior to server connection entry.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase border-b border-slate-100">
                    <th className="p-4 pl-6">Pharmacy Facility Name</th>
                    <th className="p-4">Geographic Location</th>
                    <th className="p-4">License Code ID</th>
                    <th className="p-4 text-right pr-6">Authorization Decisions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 pl-6 font-semibold text-slate-900 whitespace-nowrap">Apex Medical Retailers</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">Downtown Square, Suite 4B</td>
                    <td className="p-4 font-mono text-xs text-slate-600 whitespace-nowrap">LIC-77491-MD</td>
                    <td className="p-4 text-right pr-6 whitespace-nowrap space-x-2">
                      <button className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold px-3 py-1.5 rounded-lg transition-all">Flag / Deny</button>
                      <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-all">Grant License</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;