import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import ShopOwnerDashboard from '../pages/ShopOwnerDashboard';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const AppRoutes = () => {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* User Dashboard */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Shop Owner Dashboard */}
      <Route
        path="/shop-dashboard"
        element={
          <ProtectedRoute role="shop_owner">
            <ShopOwnerDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;