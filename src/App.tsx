import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from "./components/Header";
import Body from  './components/Body';
import Authentication from './components/Authentication';
import CartPage from './components/CartPage';
import DeliveryPage from './components/DeliveryPage';
import Payment from './components/Payment';
import Appreciation from './components/Appreciation';
import MobileMenu from './components/MobileMenu';
import FoodTrayMobile from './components/FoodTrayMobile';
import BottomHero from './components/BottomHero';
import { useAuthStore } from './utils/store';
import PaymentReceipt from './components/PaymentReceipt';
import Orders from './components/OrderPage';
import OrderDetails from './components/OrderDetails';

function App() {

  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
    <Header /> 
    <MobileMenu />
    <Routes>
     <Route path="/" element={<Body/>} />
     <Route path="auth" element={<Authentication/>} />
     <Route path="cart" element={<CartPage/>} />
     <Route path="deliveryPage" element={<DeliveryPage/>} />
     <Route path="payment" element={<Payment/>} />
     <Route path="/payment-receipt" element={<PaymentReceipt/>} />
     <Route path="/orders" element={<Orders/>} />
     <Route path="/orders/:id" element={<OrderDetails/>} />
     <Route path="/appreciation" element={<Appreciation/>} />
     <Route path="/BottomHero" element={<BottomHero/>} />
     <Route path="/FoodTrayMobile" element={<FoodTrayMobile/>} />
    </Routes>
    </>
  )
}

export default App
