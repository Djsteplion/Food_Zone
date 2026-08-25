import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../utils/store";

const Appreciation = () => {
  const clearCart = useProductStore((state) => state.clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-8">
      <div className="w-full max-w-[480px] text-center">
        {/* Delivery Animation */}
        <section
          aria-labelledby="delivery-status"
          className="relative mb-8 h-[230px] overflow-hidden rounded-[24px] bg-[#f3f4f6]"
        >
          {/* Sky / background */}
          <div className="absolute inset-0" aria-hidden="true">
            {/* Clouds */}
            <div className="cloud cloud-one" />
            <div className="cloud cloud-two" />

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-[65px] bg-black">
              <div className="road-line" />
            </div>

            {/* Truck */}
            <div className="delivery-truck">
              {/* Truck body */}
              <div className="truck-body">
                <div className="truck-logo">XUM</div>
                <div className="truck-window" />
                <div className="truck-door-line" />
              </div>

              {/* Truck front */}
              <div className="truck-front">
                <div className="truck-windshield" />
                <div className="truck-light" />
              </div>

              {/* Wheels */}
              <div className="wheel wheel-left">
                <div className="wheel-inner" />
              </div>

              <div className="wheel wheel-right">
                <div className="wheel-inner" />
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div
            id="delivery-status"
            role="status"
            aria-live="polite"
            className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-[#FF8233]"
            />
            <span className="text-xs font-semibold text-black">
              Out for delivery
            </span>
          </div>
        </section>

        {/* Success icon */}
        <div
          aria-hidden="true"
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF8233] shadow-[0_8px_25px_rgba(255,130,51,0.25)]"
        >
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
        <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[32px]">
          Your order is on its way!
        </h1>

        <p className="mx-auto mt-3 max-w-[380px] text-[15px] leading-6 text-gray-500">
          Your food has been packaged and handed over to our delivery team.
          Sit back and relax — it won't be long now.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="w-full rounded-xl bg-[#FF8233] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(255,130,51,0.2)] transition-all duration-200 hover:bg-[#e97027] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8233] focus-visible:ring-offset-2 sm:w-auto"
          >
            View My Order
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-xl bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8233] focus-visible:ring-offset-2 sm:w-auto"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default Appreciation;