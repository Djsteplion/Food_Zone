import FzSecond from './FzSecond';
import { useProductStore, useAuthStore } from '../utils/store';
import { useNavigate } from 'react-router-dom';
import coloredTrash from '../images/icons8-trash-26.png';

const CartPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const {
    cart,
    getTotalPrice,
    getGrandTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useProductStore();

  const totalPrice = getTotalPrice();
  const grandTotal = getGrandTotal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cart.length > 0) {
      navigate('/deliveryPage');
      return;
    }

    if (user) {
      window.alert(
        `Your Cart Is Empty,\nFor Desktop: click on the LOGO to return to the homepage
        \nFor Mobile: click on 'BROWSE FOOD' within the Menu sidebar to select your choice`
      );
    }
  };

  return (
    <div
      className="flex flex-col gap-[10px] mr-[0px] pr-[12px] pl-[12px] items-center justify-center lg:justify-between lg:flex-row lg:items-start lg:mr-[80px] lg:pr-[0px] lg:pl-[0px]"
      aria-label="Shopping cart"
    >
      <FzSecond />

      <div className="flex items-center justify-center max-h-screen bg-gray-100 lg:p-1">
        {/* Main Card */}
        <section
          className="w-full min-w-screen bg-[#f3f4f6] mt-[20px] rounded-[10px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.1)] lg:min-w-[450px] lg:mr-[0px] lg:ml-[0px] lg:mt-[0px] lg:p-8"
          aria-labelledby="cart-heading"
        >
          {/* Header */}
          <header className="mb-8">
            <h1
              id="cart-heading"
              className="text-[16px] font-bold text-gray-900 mb-1 lg:text-[20px] lg:mb-2"
            >
              Your Cart
            </h1>
          </header>

          <div className="flex flex-col justify-center items-center select-none">
            {cart.length > 0 ? (
              cart.map((item) => (
                <article
                  key={item.id}
                  className="bg-white w-inherit h-[80px] rounded-l-[50px] flex flex-row mb-[10px] justify-between items-center px-[10px] py-[10px] transition-all duration-[1250ms] ease-in lg:px-[15px] lg:m-[5px]"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-15 h-15"
                  />

                  <div className="flex flex-col gap-1 items-start ml-[5px] lg:ml-[20px]">
                    <h2 className="text-[12px] font-medium text-[rgb(0,0,0,0.7)] lg:text-[14px]">
                      {item.title}
                    </h2>

                    <p className="text-[10px] lg:text-[12px]">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex justify-between flex-row items-center ml-auto">
                    <div className="flex items-center">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-[9px] h-[15px] w-[15px] mr-[4px] lg:text-[13px] lg:h-[22px] lg:w-[22px] flex justify-center items-center select-none rounded-[50%] bg-[rgb(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                      >
                        -
                      </button>

                      <span
                        aria-label={`${item.count} ${item.title} in cart`}
                        aria-live="polite"
                        className="bg-[white] text-[10px] pl-[4px] font-medium lg:text-[13px]"
                      >
                        {item.count}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => increaseQuantity(item.id)}
                        className="text-[9px] h-[15px] w-[15px] ml-[4px] lg:text-[13px] lg:h-[22px] lg:w-[22px] flex justify-center items-center select-none rounded-[50%] bg-[rgb(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${item.title} from cart`}
                      onClick={() => removeFromCart(item.id)}
                      className="ml-[10px] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-sm"
                    >
                      <img
                        src={coloredTrash}
                        alt=""
                        aria-hidden="true"
                        className="h-[15px] w-[15px] lg:h-[25px] lg:w-[25px]"
                      />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p
                className="text-sm text-gray-600 py-4"
                role="status"
              >
                Your cart is empty.
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="flex items-center justify-center max-h-screen bg-gray-100 p-1">
        <section
          className="min-w-screen bg-[#f3f4f6] rounded-[5px] py-5 px-2 shadow-[0_8px_30px_rgb(0,0,0,0.1)] lg:mr-[0px] lg:ml-[0px] lg:min-w-[400px] lg:w-full lg:py-8 lg:px-8"
          aria-labelledby="order-summary-heading"
        >
          <h2
            id="order-summary-heading"
            className="text-[15px] font-bold text-gray-900 mb-4 lg:mb-10 lg:text-[20px]"
          >
            Order Summary
          </h2>

          <div className="w-[100%] rounded-[10px] bg-white p-4">
            <div className="flex flex-row justify-between items-center pb-[12px] mt-[15px] border-b-1 border-b-[rgb(0,0,0,0.15)]">
              <p className="text-[rgb(0,0,0,0.5)]">Sub-Total:</p>
              <p className="font-medium">${totalPrice}</p>
            </div>

            <div className="flex flex-row justify-between items-center pb-[12px] mt-[15px] border-b-1 border-b-[rgb(0,0,0,0.15)]">
              <p className="text-[rgb(0,0,0,0.5)]">Delivery Fee:</p>
              <p className="font-medium">$10</p>
            </div>

            <div className="flex flex-row justify-between items-center pb-[12px] mt-[27px] mb-[1px]">
              <p>Total:</p>
              <p className="font-bold">${grandTotal}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="w-full mt-[35px] py-4 bg-[#FF8A3D] text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              disabled={cart.length === 0}
              aria-disabled={cart.length === 0}
            >
              Proceed to checkout
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CartPage;