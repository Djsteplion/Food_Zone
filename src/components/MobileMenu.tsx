import FoodTrayMobile from './FoodTrayMobile';

import { useEffect, useRef, useState } from 'react';
import { useProductStore, useAuthStore } from '../utils/store';
import { useNavigate } from 'react-router-dom';

import home from '../images/XUM.png';
import browseFood from '../images/—Pngtree—chef hat vector icon design_8991468.png';
import cart from '../images/—Pngtree—shopping cart convenient icon_4637407.png';
import Login from '../images/person.png';
import logOut from '../images/logout.png';
import orders from '../images/orders.png';

const MobileMenu = () => {
  const [foodTray, setFoodTray] = useState(false);

  const isMenuOpen = useProductStore((state) => state.isMenuOpen);
  const closeMenu = useProductStore((state) => state.closeMenu);

  const user = useAuthStore((state) => state.user);
  const logout = useProductStore((state) => state.logout);

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const toHomepage = () => {
    navigate('/');
    closeMenu();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
    closeMenu();
  };

  const toCart = () => {
    navigate('/cart');
    closeMenu();
  };

  const toOrdersPage = () => {
    navigate('/orders');
    closeMenu();
  };

  const handleLogin = () => {
    navigate('/auth');
    closeMenu();
  };

  // Close menu with Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  // Prevent background scrolling while menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;

  return (
    <div
      ref={menuRef}
      className="menuBar bg-[white] transition-all duration-[3000ms] ease-in-out w-full h-screen fixed inset-0 z-50 [clip-path:polygon(30%_0%,_100%_0%,_100%_100%,_30%_100%,_0%_40%)] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <button
        type="button"
        onClick={closeMenu}
        aria-label="Close navigation menu"
        className="absolute top-0.5 right-6 text-2xl font-light text-gray-500 hover:text-black p-2"
      >
        <span aria-hidden="true">✕</span>
      </button>

      <nav
        aria-label="Mobile navigation"
        className="pl-[35%] pr-[10%] pt-13"
      >
        <button
          type="button"
          onClick={toHomepage}
          className="w-full flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)] text-left"
        >
          <img
            src={home}
            alt=""
            aria-hidden="true"
            className="h-[15px] w-[50px]"
          />
          <span className="text-[18px] font-bold">Home</span>
        </button>

        <div>
          <button
            type="button"
            onClick={() => setFoodTray((previous) => !previous)}
            aria-expanded={foodTray}
            aria-controls="mobile-food-tray"
            className="w-full flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)] text-left"
          >
            <img
              src={browseFood}
              alt=""
              aria-hidden="true"
              className="h-[50px] w-[50px]"
            />

            <span className="text-[black] text-[18px] font-bold">
              Browse Food
            </span>
          </button>

          {foodTray && (
            <div
              id="mobile-food-tray"
              className="mr-[15px]"
            >
              <FoodTrayMobile />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={user ? toCart : handleLogin}
          className="w-full flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)] text-left"
          aria-label={user ? 'Open shopping cart' : 'Log in to access your cart'}
        >
          <img
            src={cart}
            alt=""
            aria-hidden="true"
            className="h-[50px] w-[50px]"
          />

          <span className="text-[18px] font-bold">Cart</span>
        </button>

        <button
          type="button"
          onClick={user ? toOrdersPage : handleLogin}
          className="w-full flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)] text-left"
          aria-label={
            user
              ? 'View your orders'
              : 'Log in to view your orders'
          }
        >
          <img
            src={orders}
            alt=""
            aria-hidden="true"
            className="h-[50px] w-[50px]"
          />

          <span className="text-[18px] font-bold">
            View Orders
          </span>
        </button>

        <button
          type="button"
          onClick={user ? handleLogout : handleLogin}
          className="w-full flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)] text-left"
          aria-label={user ? 'Log out' : 'Log in'}
        >
          <img
            src={user ? logOut : Login}
            alt=""
            aria-hidden="true"
            className="h-[50px] w-[50px]"
          />

          <span className="text-[18px] font-bold">
            {user ? 'Log Out' : 'Log In'}
          </span>
        </button>
      </nav>
    </div>
  );
};

export default MobileMenu;