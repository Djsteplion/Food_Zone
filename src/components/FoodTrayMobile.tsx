import { useState} from 'react';
import { Link } from 'react-router-dom';
import {useProductStore, useAuthStore} from '../utils/store';
import orderBtn from '../images/order button.png';
import addCart from '../images/icons8-add-to-cart-50.png';



const FoodTrayMobile = () => {

 const {products, addToCart} = useProductStore();

 // ---  Auth & Session Logic ---
 const user = useAuthStore((state) => state.user); // Just one line!  


 const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='flex justify-center flex-col items-center lg:flex-row'>
    
      <div  className='hidden max-h-screen flex flex-col items-center justify-center'>
        <div className='-z-10 flex justify-center items-center mr-auto ml-auto mt-[100px] h-[280px] w-[310px] lg:w-[500px] lg:h-[370px] lg:mt-[0px]'> 
            <img src={products[activeIndex]?.imageSrc2 || ""} alt={products[activeIndex]?.title || "No item selected"} className='w-full h-full'/>
        </div>
        <div className='h-[40px] w-[112.5px] -mt-[20px] hover:cursor-pointer lg:h-[80px] lg:w-[225.5px]'>
            <Link to ={user? 'cart' : 'auth'}>
              <img src={orderBtn} alt="order button" className='w-full' onClick={() => user? addToCart(products[activeIndex]) : ''}/>
            </Link>
        </div>
      </div>
      
     


      <div className='flex flex-col items-end mr-[15px]'>
        {products.map((product, index) => {
              const isActive = activeIndex === index;
      
              return (
                <div 
                  key={product.id}
                  onClick={() => setActiveIndex(index)}
                  className= {isActive ? 'selectedBg' : 'normalBg'}
                >
                <img src={product.imageSrc} alt=""  className='selectedImg w-9 h-9'/>
                <div className='flex flex-col gap-0.5 items-start ml-1.5'>
                    <h5 className='font-bold text-[11px]'>{product.title}</h5>
                    <p className='leading-none text-[10px]'>{product.description}</p>
                </div>
                {user ? 
                  (
                    <div className='addCart w-[13px] h-[13px] ml-auto'
                    onClick={() => addToCart(product)}
                    >
                      <img src={addCart} alt=""></img>
                    </div>
                  ) : (
                    ''
                  )
                }
                  
                </div>
              );
            })}  
      </div>
    </div>
  )
}

export default FoodTrayMobile