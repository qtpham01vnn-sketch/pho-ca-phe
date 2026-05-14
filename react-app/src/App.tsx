import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import MainLayout from './layouts/MainLayout';
import OrderStatusPage from './pages/OrderStatusPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import MembershipPage from './pages/MembershipPage';
import BaristaPage from './pages/BaristaPage';
import WelcomePage from './pages/WelcomePage';
import StaffLayout from './layouts/StaffLayout';
import StaffHistoryPage from './pages/StaffHistoryPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/AdminDashboardPage';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public / Customer Routes */}
              <Route path="/" element={<WelcomePage />} />
              <Route path="/" element={<MainLayout />}>
                <Route path="menu" element={<MenuPage />} />
                <Route path="order-status" element={<OrderStatusPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="membership" element={<MembershipPage />} />
              </Route>
              
              {/* Staff Routes - Protected */}
              <Route path="/staff" element={
                <ProtectedRoute requiredRole="STAFF">
                  <StaffLayout />
                </ProtectedRoute>
              }>
                <Route path="barista" element={<BaristaPage />} />
                <Route path="history" element={<StaffHistoryPage />} />
              </Route>

              {/* Admin Routes - Protected */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<AdminDashboardPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;
