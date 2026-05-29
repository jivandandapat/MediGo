import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  ClipboardList,
  Package,
  LogOut,
  TrendingUp,
  AlertCircle,
  Search,
  Eye,
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
        <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">
          Merchant Terminal
        </span>
      </div>

      <nav className="space-y-1">
        <button
          onClick={() => onTabChange('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'overview' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          Analytics Overview
        </button>

        <button
          onClick={() => onTabChange('orders')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'orders' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <ClipboardList className="h-5 w-5 shrink-0" />
          Live Orders
        </button>

        <button
          onClick={() => onTabChange('inventory')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'inventory' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <Package className="h-5 w-5 shrink-0" />
          Inventory Control
        </button>
      </nav>
    </div>

    <div className="border-t border-slate-800 pt-4">
      <div className="px-4 py-2 mb-2">
        <p className="text-sm font-semibold text-slate-200">City Care Pharmacy</p>
        <p className="text-xs text-slate-500">Merchant Terminal</p>
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
const ShopOwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
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
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-400 flex-col justify-between p-5 shrink-0">
        <SidebarContent activeTab={activeTab} onTabChange={handleTabChange} onLogout={logout} />
      </aside>

      {/* MOBILE Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MOBILE Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-slate-400 flex flex-col justify-between p-5 transition-transform duration-300 md:hidden ${
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

        <header className="h-16 sm:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-all shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 truncate flex-1">
            Incoming Orders Terminal
          </h1>
          <span className="bg-emerald-50 text-emerald-700 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border border-emerald-200 flex items-center gap-1 sm:gap-1.5 animate-pulse shrink-0">
            <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full"></span>
            <span className="hidden sm:inline">Live Updates Active</span>
            <span className="sm:hidden">Live</span>
          </span>
        </header>

        <div className="p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Income Today</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">$1,240.50</h3>
              </div>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0">
                <TrendingUp className="h-3 w-3" />+12%
              </span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Incoming Requests</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">7 New</h3>
              </div>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-lg text-xs font-semibold shrink-0">Fulfillment Due</span>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Inventory Alerts</span>
                <h3 className="text-xl sm:text-2xl font-bold text-rose-600 mt-1">3 Items</h3>
              </div>
              <span className="p-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0">
                <AlertCircle className="h-3 w-3" />Restock
              </span>
            </div>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Fulfillment Queue</h3>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Order ID..."
                  className="w-full sm:w-auto pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4 pl-6">Order Identity</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Medications Requested</th>
                    <th className="p-4">Rx Document</th>
                    <th className="p-4 text-right pr-6">Workflow Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 pl-6 font-semibold text-slate-900 whitespace-nowrap">#MG-9382</td>
                    <td className="p-4 whitespace-nowrap">Sarah Connor</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">Metformin 500mg (x60 Tablets)</td>
                    <td className="p-4 whitespace-nowrap">
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 text-xs bg-emerald-50 px-2 py-1 rounded">
                        <Eye className="h-3 w-3" />View Rx
                      </button>
                    </td>
                    <td className="p-4 text-right pr-6 whitespace-nowrap space-x-2">
                      <button className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold px-3 py-1.5 rounded-lg transition-all">Reject</button>
                      <button className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-all">Dispense</button>
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

export default ShopOwnerDashboard;