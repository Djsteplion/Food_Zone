import { useProductStore } from "../utils/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import Logo from '../images/logo.png';

const Appreciation = () => {
  const clearCart = useProductStore((state) => state.clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="w-full max-w-[480px] text-center">

        {/* Delivery Animation */}
        <div className="relative h-[230px] overflow-hidden rounded-[24px] bg-[#f3f4f6] mb-8">

          {/* Sky / background */}
          <div className="absolute inset-0">

            {/* Clouds */}
            <div className="cloud cloud-one"></div>
            <div className="cloud cloud-two"></div>

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-[65px] bg-black">
              <div className="road-line"></div>
            </div>

            {/* Truck */}
            <div className="delivery-truck">

              {/* Truck body */}
              <div className="truck-body">
                <div className="truck-logo">
                   XUM
                   {/* <img src={Logo} alt="Logo" className='w-16 h-5 lg:w-25.25 lg:h-9.75' /> */}
                </div>

                <div className="truck-window"></div>

                <div className="truck-door-line"></div>
              </div>

              {/* Truck front */}
              <div className="truck-front">
                <div className="truck-windshield"></div>
                <div className="truck-light"></div>
              </div>

              {/* Wheels */}
              <div className="wheel wheel-left">
                <div className="wheel-inner"></div>
              </div>

              <div className="wheel wheel-right">
                <div className="wheel-inner"></div>
              </div>
            </div>
          </div>

          {/* Small status badge */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF8233] animate-pulse"></span>
            <span className="text-xs font-semibold text-black">
              Out for delivery
            </span>
          </div>
        </div>

        {/* Success icon */}
        <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-[#FF8233] flex items-center justify-center shadow-[0_8px_25px_rgba(255,130,51,0.25)]">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-[28px] md:text-[32px] font-bold text-black tracking-tight">
          Your order is on its way!
        </h1>

        <p className="mt-3 text-[15px] leading-6 text-gray-500 max-w-[380px] mx-auto">
          Your food has been packaged and handed over to our delivery team.
          Sit back and relax — it won't be long now.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate("/orders")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FF8233] text-white font-semibold text-sm hover:bg-[#e97027] active:scale-[0.98] transition-all duration-200 shadow-[0_6px_20px_rgba(255,130,51,0.2)]"
          >
            View My Order
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-800 active:scale-[0.98] transition-all duration-200"
          >
            Back to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default Appreciation;