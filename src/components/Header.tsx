import Logo from '../images/logo.png';
import cartImage from '../images/Group.png';
import menuButton from '../images/Group 827.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useProductStore, useAuthStore} from '../utils/store';

const Header = () => {

const [mealMessage, setMealMessage] = useState<{
  selectedMeal: string;
  availableTime: string;
  currentMeal: string;
} | null>(null);

const logout = useProductStore((state) => state.logout);
const user = useAuthStore((state) => state.user);
const isAuthPage = location.pathname === "/auth";

 // Hook to handle programmatic navigation
const navigate = useNavigate();

// Function to handle form submission and validation
const toHomepage = () => {
 // e.preventDefault(); // Prevents the browser from reloading
  navigate('/');
};

const handleLogout = async () => {
    await logout();
    navigate('/auth'); // Redirect to login page after logout
  };

const toLogin = () => {
  navigate('/auth');
}  

const toCartPage = () => {
 // e.preventDefault(); // Prevents the browser from reloading
 if(totalItems > 0)
  navigate('cart');
};

// Get current hour (0-23)
  const currentHour = new Date().getHours();

  // Determine the time of day
  const isMorning = currentHour >= 5 && currentHour < 12;
  const isAfternoon = currentHour >= 12 && currentHour < 17;
  const isEvening = currentHour >= 17 || currentHour < 5;

  // Helper function to keep JSX clean
  const getMealStyle = (isActive: boolean) => {
    return isActive 
      ? 'text-sm font-bold text-[#FF8A3D] scale-110 transition-all' // Active: bigger, bold, orange
      : 'text-xs text-gray-400 hover:text-black transition-all';    // Inactive: standard
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

const totalItems = useProductStore((state) => state.getTotalItems());
const toggleMenu = useProductStore((state) => state.toggleMenu);

  return (
    <>
    <div className='flex justify-between items-center py-2.5 pl-3 pr-3 lg:py-5 lg:pl-12.5 lg:pr-25'>
        <img src={Logo} alt="Logo" className='w-15 h-5 lg:w-25.25 lg:h-9.75' onClick={toHomepage}/>
        <div className='hidden lg:flex items-center justify-between gap-20'>
            <p className={`hover:cursor-pointer select-none ${getMealStyle(isMorning)}`} onClick={() => handleMealClick('Breakfast')}>Breakfast</p>
            <p className={`cursor-pointer select-none ${getMealStyle(isAfternoon)}`} onClick={() => handleMealClick('Lunch')}>Lunch</p>
            <p className={`cursor-pointer select-none ${getMealStyle(isEvening)}`} onClick={() => handleMealClick('Dinner')}>Dinner</p>
            <button
              onClick={() => navigate('/orders')}
              className="text-xs font-semibold text-gray-500 hover:text-[#FF8A3D] transition-colors"
            >
              Orders
            </button>
            <div className='outer1'>
              <img src={cartImage} alt="" />
              <div className="cartCount hover:cursor-pointer select-none" onClick={() => user ? toCartPage() : toLogin()}>{totalItems.toString()} </div>
            </div>
            
            { user ? (
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 font-semibold hover:underline"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="text-xs text-[#FF8A3D] font-semibold hover:underline"
              >
                {isAuthPage ? '' : 'Login'}
              </button>
            )}
        </div>
        <img src={menuButton} alt="menu button" onClick={toggleMenu} className='h-3.5 w-3.75 lg:hidden'/>
    </div>
    

    {mealMessage && (
      <div
        className="fixed inset-0 z-999 flex items-center justify-center bg-black/20 backdrop-blur-[3px] px-5"
        onClick={() => setMealMessage(null)}
      >
        <div
          className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-[mealPopup_.3s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF1E8] text-xl">
              🍽️
            </div>

            <div>
              <h3 className="text-base font-bold text-black">
                {mealMessage.selectedMeal} isn't being served right now
              </h3>

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

          <button
            onClick={() => setMealMessage(null)}
            className="mt-5 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#FF8233] active:scale-[0.98]"
          >
            Got it
          </button>
        </div>
      </div>
    )}
    </>
  )
}

export default Header