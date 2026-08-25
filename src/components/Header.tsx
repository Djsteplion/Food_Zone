import Logo from '../images/logo.png';
import cartImage from '../images/Group.png';
import menuButton from '../images/Group 827.png';

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useProductStore, useAuthStore } from '../utils/store';

const Header = () => {
  const [mealMessage, setMealMessage] = useState<{
    selectedMeal: string;
    availableTime: string;
    currentMeal: string;
  } | null>(null);

  const logout = useProductStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const totalItems = useProductStore((state) => state.getTotalItems());
  const toggleMenu = useProductStore((state) => state.toggleMenu);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toHomepage = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const toLogin = () => {
    navigate('/auth');
  };

  const toCartPage = () => {
    if (totalItems > 0) {
      navigate('/cart');
    }
  };

  // Get current hour (0-23)
  const currentHour = new Date().getHours();

  const isMorning = currentHour >= 5 && currentHour < 12;
  const isAfternoon = currentHour >= 12 && currentHour < 17;
  const isEvening = currentHour >= 17 || currentHour < 5;

  const getMealStyle = (isActive: boolean) => {
    return isActive
      ? 'text-sm font-bold text-[#FF8A3D] scale-110 transition-all'
      : 'text-xs text-gray-400 hover:text-black transition-all';
  };

  const handleMealClick = (meal: string) => {
    const mealInfo = {
      Breakfast: {
        availableTime: '5:00 AM – 12:00 PM',
        active: isMorning,
      },
      Lunch: {
        availableTime: '12:00 PM – 5:00 PM',
        active: isAfternoon,
      },
      Dinner: {
        availableTime: '5:00 PM – 5:00 AM',
        active: isEvening,
      },
    };

    const selected = mealInfo[meal as keyof typeof mealInfo];

    if (selected.active) {
      navigate('/');
      return;
    }

    setMealMessage({
      selectedMeal: meal,
      availableTime: selected.availableTime,
      currentMeal: isMorning
        ? 'Breakfast'
        : isAfternoon
        ? 'Lunch'
        : 'Dinner',
    });
  };

  // Keep keyboard focus inside the modal and close it with Escape.
  useEffect(() => {
    if (!mealMessage) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMealMessage(null);
      }

      if (event.key === 'Tab') {
        const modal = modalRef.current;

        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mealMessage]);

  return (
    <>
      <header>
        <div className="flex justify-between items-center py-2.5 pl-3 pr-3 lg:py-5 lg:pl-12.5 lg:pr-25">
          
          <button
            type="button"
            onClick={toHomepage}
            aria-label="Go to homepage"
            className="cursor-pointer"
          >
            <img
              src={Logo}
              alt="Caviar Express"
              className="w-15 h-5 lg:w-25.25 lg:h-9.75"
            />
          </button>

          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center justify-between gap-20"
          >
            <button
              type="button"
              onClick={() => handleMealClick('Breakfast')}
              className={`${getMealStyle(
                isMorning
              )} hover:cursor-pointer select-none`}
              aria-current={isMorning ? 'page' : undefined}
            >
              Breakfast
            </button>

            <button
              type="button"
              onClick={() => handleMealClick('Lunch')}
              className={`${getMealStyle(
                isAfternoon
              )} cursor-pointer select-none`}
              aria-current={isAfternoon ? 'page' : undefined}
            >
              Lunch
            </button>

            <button
              type="button"
              onClick={() => handleMealClick('Dinner')}
              className={`${getMealStyle(
                isEvening
              )} cursor-pointer select-none`}
              aria-current={isEvening ? 'page' : undefined}
            >
              Dinner
            </button>

            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="text-xs font-semibold text-gray-500 hover:text-[#FF8A3D] transition-colors"
            >
              Orders
            </button>

            <button
              type="button"
              onClick={user ? toCartPage : toLogin}
              className="outer1 relative cursor-pointer"
              aria-label={
                user
                  ? `Shopping cart with ${totalItems} ${
                      totalItems === 1 ? 'item' : 'items'
                    }`
                  : 'Log in to access shopping cart'
              }
            >
              <img
                src={cartImage}
                alt=""
                aria-hidden="true"
              />

              <span
                className="cartCount hover:cursor-pointer select-none"
                aria-hidden="true"
              >
                {totalItems}
              </span>
            </button>

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-red-500 font-semibold hover:underline"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={toLogin}
                className="text-xs text-[#FF8A3D] font-semibold hover:underline"
                aria-label="Log in"
              >
                {isAuthPage ? '' : 'Login'}
              </button>
            )}
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            className="h-3.5 w-3.75 lg:hidden cursor-pointer"
            aria-label="Open navigation menu"
            aria-haspopup="true"
          >
            <img
              src={menuButton}
              alt=""
              aria-hidden="true"
              className="h-3.5 w-3.75"
            />
          </button>
        </div>
      </header>

      {mealMessage && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/20 backdrop-blur-[3px] px-5"
          role="presentation"
          onClick={() => setMealMessage(null)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="meal-message-title"
            aria-describedby="meal-message-description"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-[mealPopup_.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF1E8] text-xl"
                aria-hidden="true"
              >
                🍽️
              </div>

              <div>
                <h2
                  id="meal-message-title"
                  className="text-base font-bold text-black"
                >
                  {mealMessage.selectedMeal} isn't being served right now
                </h2>

                <div id="meal-message-description">
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {mealMessage.selectedMeal} is available from{' '}
                    <span className="font-semibold text-black">
                      {mealMessage.availableTime}
                    </span>
                    .
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Kindly check back during those hours. For now,{' '}
                    <span className="font-semibold text-[#FF8233]">
                      {mealMessage.currentMeal}
                    </span>{' '}
                    is currently on sale.
                  </p>
                </div>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMealMessage(null)}
              className="mt-5 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#FF8233] active:scale-[0.98]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
