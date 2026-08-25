import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header';
import Body from './components/Body';
import Authentication from './components/Authentication';
import CartPage from './components/CartPage';
import DeliveryPage from './components/DeliveryPage';
import Payment from './components/Payment';
import Appreciation from './components/Appreciation';
import MobileMenu from './components/MobileMenu';
import FoodTrayMobile from './components/FoodTrayMobile';
import BottomHero from './components/BottomHero';
import PaymentReceipt from './components/PaymentReceipt';
import Orders from './components/OrderPage';
import OrderDetails from './components/OrderDetails';

import { useAuthStore } from './utils/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <Header />
      <MobileMenu />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Body />} />

          <Route path="/auth" element={<Authentication />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/deliveryPage" element={<DeliveryPage />} />

          <Route path="/payment" element={<Payment />} />

          <Route
            path="/payment-receipt"
            element={<PaymentReceipt />}
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appreciation"
            element={<Appreciation />}
          />

          
          <Route
            path="/BottomHero"
            element={<BottomHero />}
          />

          <Route
            path="/FoodTrayMobile"
            element={<FoodTrayMobile />}
          />

          {/* Unknown URLs */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
