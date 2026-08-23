import Logo from '../images/logo.png';
import cartImage from '../images/Group.png';
import menuButton from '../images/Group 827.png';
import { useNavigate } from 'react-router-dom';
import {useProductStore, useAuthStore} from '../utils/store';

const Header = () => {

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

const totalItems = useProductStore((state) => state.getTotalItems());
const toggleMenu = useProductStore((state) => state.toggleMenu);

  return (
    <>
    <div className='flex justify-between items-center py-2.5 pl-3 pr-3 lg:py-5 lg:pl-12.5 lg:pr-25'>
        <img src={Logo} alt="Logo" className='w-15 h-5 lg:w-25.25 lg:h-9.75' onClick={toHomepage}/>
        <div className='hidden lg:flex items-center justify-between gap-20'>
            <p className={`hover:cursor-pointer select-none ${getMealStyle(isMorning)}`} onClick={toHomepage}>Breakfast</p>
            <p className={`cursor-pointer select-none ${getMealStyle(isAfternoon)}`} onClick={toHomepage}>Lunch</p>
            <p className={`cursor-pointer select-none ${getMealStyle(isEvening)}`} onClick={toHomepage}>Dinner</p>
            <div className='outer1'>
              <img src={cartImage} alt="" />
              <div className="cartCount hover:cursor-pointer select-none" onClick={toCartPage}>{totalItems.toString()} </div>
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
    
    </>
  )
}

export default Header