import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useProductStore, useAuthStore} from '../utils/store';
import orderBtn from '../images/order button.png';
import addCart from '../images/icons8-add-to-cart-50.png';
import BottomHero from './BottomHero';



const Menu = () => {
const { products, addToCart } = useProductStore();
  const [activeIndex, setActiveIndex] = useState(0);

  // --- 1. Auth & Session Logic ---
 const user = useAuthStore((state) => state.user); // Just one line!

  // --- 2. Corrected 3D Logic ---
  useEffect(() => {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    const featureCards = document.querySelectorAll<HTMLElement>('.feature-card-3d');

    if (!carousel || !prevBtn || !nextBtn || featureCards.length === 0) return;

    let currentRotation = 0;
    let currentIndex = 0;
    const degreesPerItem = 360 / featureCards.length;

    const updateView = () => {
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    
    const dots = document.querySelectorAll('.indicator');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

    // Detect if we are on mobile to use the 140px distance or 200px
    const isMobile = window.innerWidth <= 768;
    const baseZ = isMobile ? 140 : 200;

    featureCards.forEach((card, index) => {
        const angle = index * degreesPerItem;
        
        if (index === currentIndex) {
            // Active card: Move slightly forward (+20px) and enable clicks
            card.style.transform = `rotateY(${angle}deg) translateZ(${baseZ + 20}px)`;
            card.style.zIndex = "1000"; 
            card.style.opacity = "1";
            card.style.pointerEvents = "auto"; 
        } else {
            // Inactive cards: Move to base distance and DISABLE clicks
            card.style.transform = `rotateY(${angle}deg) translateZ(${baseZ}px)`;
            card.style.zIndex = "1";
            card.style.opacity = "0.4";
            card.style.pointerEvents = "none"; // This stops 2 and 4 from blocking 1 and 3
        }
    });

    setActiveIndex(currentIndex);
};

    // Initial positioning
    featureCards.forEach((card, index) => {
      card.style.transform = `rotateY(${index * degreesPerItem}deg) translateZ(100px)`;
    });

    // Indicators Setup
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      products.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `indicator ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => {
          currentIndex = index;
          currentRotation = -index * degreesPerItem;
          updateView();
        };
        indicatorsContainer.appendChild(dot);
      });
    }

    const handleNext = () => {
      currentIndex = (currentIndex + 1) % featureCards.length;
      currentRotation -= degreesPerItem;
      updateView();
    };

    const handlePrev = () => {
      currentIndex = (currentIndex - 1 + featureCards.length) % featureCards.length;
      currentRotation += degreesPerItem;
      updateView();
    };

    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);

    // Call updateView once to set initial z-indexes
    updateView();

    return () => {
      nextBtn.removeEventListener('click', handleNext);
      prevBtn.removeEventListener('click', handlePrev);
    };
  }, [products]);
  return (
    <div className='w-full flex justify-center flex-col items-center lg:flex-row'>
      <div  className='hidden lg:w-full lg:max-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center'>
        <div className='flex justify-center items-center mr-auto ml-auto mt-[100px] h-[280px] w-[310px] lg:w-[400px] lg:h-[370px] lg:mt-[30px]'> 
            <img src={products[activeIndex]?.imageSrc2 || ""} alt={products[activeIndex]?.title || "No item selected"} className='w-full h-full'/>
        </div>
        <div className='h-[40px] w-[112.5px] -mt-[20px] hover:cursor-pointer lg:h-[80px] lg:w-[225.5px]'>
            <Link to ={user? 'cart' : 'auth'}> {/* :'auth' */}
              <img src={orderBtn} alt="order button" className='w-full' onClick={() => user? addToCart(products[activeIndex]) : ''}/>
            </Link>
        </div>
      </div>

      <div className='hidden lg:flex lg:flex-col lg:items-end lg:hover:cursor-pointer'>
        {products.map((product, index) => {
              const isActive = activeIndex === index;
      
              return (
                <div 
                  key={product.id}
                  onClick={() => setActiveIndex(index)}
                  className= {isActive ? 'selectedBg' : 'normalBg'}
                >
                <img src={product.imageSrc} alt=""  className='selectedImg w-15 h-15'/>
                <div className='flex flex-col gap-1 items-start ml-4'>
                    <h5 className='font-bold'>{product.title}</h5>
                    <p className='leading-none text-[12px]'>{product.description}</p>
                </div>
                {user ? 
                  (
                    <div className='addCart w-[20px] h-[20px] ml-auto'
                    onClick={() => addToCart(product)}
                    >
                      <img src={addCart} alt=""></img>
                    </div>
                  ) : (
                    /*
                     <div className='addCart w-[20px] h-[20px] ml-auto'
                    onClick={() => addToCart(product)}
                    >
                      <img src={addCart} alt=""></img>
                    </div>
                    */
                   null
                  )
                }
                  
                </div>
              );
            })}  
      </div>

       <div className='flex flex-col justify-between items-center mt-[-70px]'>
            <div className="features-container lg:hidden">
                <div className="carousel-3d" id="carousel">
                  {products.map((product) => {
                      return (
                        <>
                        <div  className="feature-card-3d flex flex-col items-center" data-index={product.id}>
                          <div className=' flex justify-center items-center h-[250px] w-[220px]'> 
                              <img src={product.imageSrc || ""} alt={product.title || "No item selected"} className='w-full h-full'/>
                          </div>
                          <div className='h-[40px] w-[112.5px] -mt-[20px] hover:cursor-pointer lg:h-[80px] lg:w-[225.5px]'>
                              <Link to ={user? 'cart' : 'auth'}>
                                <img src={orderBtn} alt="order button" className='w-full' onClick={() => addToCart(product) }/>
                                {/* <img src={orderBtn} alt="order button" className='w-full' onClick={() => user? addToCart(product): " "}/> */}
                              </Link>
                          </div>
                        </div>
                        </>
                    )}
                    )}
                </div>
                <div className="carousel-controls">
                      <div className="carousel-btn" id="prevBtn">◀</div>
                      <div className="carousel-btn" id="nextBtn">▶</div>
                  </div>
                  <div className="carousel-indicators" id="indicators"></div>
            </div>
            <BottomHero /> 
       </div>
    </div>
  )
}

export default Menu