import FoodTrayMobile from './FoodTrayMobile';
import { useState } from 'react';
import {useProductStore, useAuthStore} from '../utils/store';
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
   
     // ---  Auth & Session Logic ---
 const user = useAuthStore((state) => state.user); // Just one line!
 const logout = useProductStore((state) => state.logout);

  // Hook to handle programmatic navigation
const navigate = useNavigate();

 // Function to handle form submission and validation
const toHomepage = () => {
 // e.preventDefault(); // Prevents the browser from reloading
  navigate('/');
  closeMenu();
};

const handleLogout = () => {
    logout();
    navigate('auth'); // Redirect to login page after logout
    closeMenu();
  };

// Function to handle form submission and validation
const toCart = () => {
 // e.preventDefault(); // Prevents the browser from reloading
  navigate('cart');
  closeMenu();
};

const toOrdersPage = () => {
    navigate('/orders');
    closeMenu();
}

const handleLogin = async () => {
    navigate('/auth'); // Redirect to login page after logout
    closeMenu();
  };
  // If the store says it's closed, return nothing
  if (!isMenuOpen) return null;  
  
  return (
    <div className="menuBar bg-[white] transition-all duration-[3000ms] ease-in-out w-full h-screen fixed inset-0 z-50 [clip-path:polygon(30%_0%,_100%_0%,_100%_100%,_30%_100%,_0%_40%)] lg:hidden"> 
        <button 
            onClick={closeMenu}
            className="absolute top-0.5 right-6 text-2xl font-light text-gray-500 hover:text-black p-2"
        >
            ✕
        </button>
        <div className='pl-[35%] pr-[10%] pt-13'>
            <div className='flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)]'
             onClick={() => {toHomepage()}}
            >
                <img src={home} alt="home-icon" className='h-[15px] w-[50px]'/>
                <p className='text-[18px] font-bold'>Home</p>
            </div>
            <div>
               <div className='flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)]'>
                    <img src={browseFood} alt="browse-food-icon" className='h-[50px] w-[50px]'/>
                    <p onClick={() => setFoodTray(!foodTray)} className='text-[black] text-[18px] font-bold'>
                        Browse Food
                    </p>
                </div>
                <div className='mr-[15px]'>
                    {foodTray && <FoodTrayMobile />}
                </div>
            </div>
            <div className='flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)]'
                onClick={() => user? toCart() : handleLogin()}
            >
                <img src={cart} alt="cart-icon" className='h-[50px] w-[50px]'/>
                <p className='text-[18px] font-bold'>Cart</p>
            </div>
            <div className='flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)]'
                onClick={() => user? toOrdersPage() : handleLogin()}
            >
                <img src={orders} alt="cart-icon" className='h-[50px] w-[50px]'/>
                <p className='text-[18px] font-bold'>View Orders</p>
            </div>
            <div className='flex flex-row items-center gap-[20px] mt-[15px] pb-[15px] border-b-[1px] border-[rgba(0,0,0,0.3)]'
                onClick={() => user? handleLogout(): handleLogin()}
            >
                <img src={ user? logOut : Login} alt={user? 'logOut icon': 'logIn icon'} className='h-[50px] w-[50px]' />
                <p className='text-[18px] font-bold'>{user? 'Log Out': 'Log In'}</p>
            </div>
        </div>
    
    </div>
  )
}

export default MobileMenu