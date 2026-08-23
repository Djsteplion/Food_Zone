import FzSecond from './FzSecond';
import {useProductStore, useAuthStore} from '../utils/store';
import { useNavigate } from 'react-router-dom';
import coloredTrash  from '../images/icons8-trash-26.png'


const CartPage = () => {

// Hook to handle programmatic navigation
const navigate = useNavigate();

 // Auth & Session Logic ---
 const user = useAuthStore((state) => state.user); // Just one line!


// Function to handle form submission and validation
const handleSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault(); // Prevents the browser from reloading
    if (cart.length > 0) {
      navigate('/deliveryPage');
    } 

    {/* 
       if (user && cart.length > 0) {
      navigate('/deliveryPage');
    } 
      
      */}
{/*
    if (!user) {
      navigate('/auth');
    }
  */}

    if(user && cart.length<= 0) {
      window.alert(`Your Cart Is Empty,\nFor Desktop: click on the LOGO to return to the homepage
         \nFor Mobile: click on 'BROWSE FOOD' within the Menu sidebar to select your choice 
      `);
    }
};

 const{cart} = useProductStore();
 const totalPrice = useProductStore((state) => state.getTotalPrice());
 const grandTotal = useProductStore((state) => state.getGrandTotal());
const {increaseQuantity, decreaseQuantity, removeFromCart} = useProductStore();

    
  return (
    <div className='flex flex-col gap-[10px] mr-[0px] pr-[12px] pl-[12px] items-center justify-center lg:justify-between lg:flex-row lg:items-start lg:mr-[80px] lg:pr-[0px] lg:pl-[0px]'>
        <FzSecond />
        <div className="flex items-center justify-center max-h-screen bg-gray-100 lg:p-1">
            {/* Main Card */}
            <div className="w-full min-w-screen bg-[#f3f4f6] mt-[20px] rounded-[10px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.1)] lg:min-w-[450px] lg:mr-[0px] lg:ml-[0px] lg:mt-[0px] lg:p-8">
              
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-[16px] font-bold text-gray-900 mb-1 lg:text-[20px] lg:mb-2">Your Cart</h1>
              </div>

                <div className='flex flex-col justify-center items-enter select-none  hover:cursor-pointer'>
                  {cart.map((item) => {
                
                        return (
                          <div 
                            key={item.id}
                            className= 'bg-white w-inherit h-[80px] rounded-l-[50px] flex flex-row mb-[10px] justify-between items-center px-[10px] py-[10px] transition-all duration-[1250ms] ease-in lg:px-[15px] lg:m-[5px]'
                          >
                          <img src={item.imageSrc} alt=""  className='w-15 h-15'/>
                          <div className='flex flex-col gap-1 items-start ml-[5px] lg:ml-[20px]'>
                              <h5 className=' text-[12px] font-medium text-[rgb(0,0,0,0.7)] lg:text-[14px]'>{item.title}</h5>
                              <p className='text-[10px] lg:text-[12px]'>${item.price}</p>
                          </div>
                        
                          <div className='flex justify-between flex-row items-center ml-auto'>
                            <div className=' flex  hover:cursor-pointer'>
                              <span className='text-[9px] h-[15px] w-[15px] mr-[4px] lg:text-[13px] lg:h-[22px] lg:w-[22px] flex justify-center items-center select-none rounded-[50%] bg-[rgb(0,0,0,0.1)]' onClick={() => decreaseQuantity(item.id)}>-</span>
                              <span className='bg-[white] text-[10px] pl-[4px] font-medium lg:text-[13px]'>{item.count}</span>
                              <span className='text-[9px] h-[15px] w-[15px] ml-[4px] lg:text-[13px] lg:h-[22px] lg:w-[22px] flex justify-center items-center select-none rounded-[50%] bg-[rgb(0,0,0,0.1)]' onClick={() => increaseQuantity(item.id)}>+</span>
                            </div>
                            
                            <img src={coloredTrash} alt='delete-icon' onClick={() => removeFromCart(item.id)} className='h-[15px] w-[15px] lg:h-[25px] lg:w-[25px] ml-[10px]' />
                          </div>
                        
                      </div>
                    );
                  })}  
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center max-h-screen bg-gray-100 p-1'>
          <div className='min-w-screen bg-[#f3f4f6] rounded-[5px] py-5 px-2 shadow-[0_8px_30px_rgb(0,0,0,0.1)] lg:mr-[0px] lg:ml-[0px] lg:min-w-[400px] lg:w-full lg:py-8 lg:px-8'>
            <h1 className='text-[15px] font-bold text-gray-900 mb-4 lg:mb-10 lg:text-[20px]'>Order Summary</h1>

            <div className='w-[100%] rounded-[10px] bg-white p-4'>
              <div className='flex flex-row justify-between items-center pb-[12px] mt-[15px] border-b-1 border-b-[rgb(0,0,0,0.15)]'>
                <p className='text-[rgb(0,0,0,0.5)]'>Sub-Total:</p>
                <p className='font-medium'>${totalPrice}</p>
              </div>
              <div className='flex flex-row justify-between items-center pb-[12px] mt-[15px] border-b-1 border-b-[rgb(0,0,0,0.15)]'>
                <p className='text-[rgb(0,0,0,0.5)]'>Delivery Fee:</p>
                <p className='font-medium'>$10</p>
              </div>
              <div className='flex flex-row justify-between items-center pb-[12px] mt-[27px] mb-[1px]'>
                <p>Total:</p>
                <p className='font-bold'>${grandTotal}</p>
              </div>
            </div>

            <button
            onClick={handleSubmit}
            type="submit" 
            className="w-full mt-[35px] py-4 bg-[#FF8A3D] text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm mt-4"
          >
           Proceed to checkout
          </button>
          </div>
        </div>
    </div>
  )
}


export default CartPage