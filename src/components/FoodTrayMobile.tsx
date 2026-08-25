import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore, useAuthStore } from "../utils/store";
import orderBtn from "../images/order button.png";
import addCart from "../images/icons8-add-to-cart-50.png";

const FoodTrayMobile = () => {
  const { products, addToCart } = useProductStore();
  const user = useAuthStore((state) => state.user);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProduct = products[activeIndex];

  const handleAddToCart = (product: (typeof products)[number]) => {
    addToCart(product);
  };

  const handleOrder = () => {
    if (user && activeProduct) {
      addToCart(activeProduct);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:flex-row">
      <div className="hidden max-h-screen flex-col items-center justify-center">
        <div className="-z-10 mr-auto ml-auto mt-[100px] flex h-[280px] w-[310px] items-center justify-center lg:mt-[0px] lg:h-[370px] lg:w-[500px]">
          {activeProduct && (
            <img
              src={activeProduct.imageSrc2}
              alt={activeProduct.title}
              className="h-full w-full"
            />
          )}
        </div>

        <div className="h-[40px] w-[112.5px] -mt-[20px] hover:cursor-pointer lg:h-[80px] lg:w-[225.5px]">
          <Link
            to={user ? "cart" : "auth"}
            onClick={handleOrder}
            aria-label={user ? "Add selected item to cart" : "Sign in to order"}
          >
            <img
              src={orderBtn}
              alt={user ? "Order selected item" : "Sign in to order"}
              className="w-full"
            />
          </Link>
        </div>
      </div>

      <div
        className="flex flex-col items-end mr-[15px]"
        role="list"
        aria-label="Available food items"
      >
        {products.map((product, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={product.id}
              role="listitem"
              className={isActive ? "selectedBg" : "normalBg"}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="flex w-full items-center text-left"
                aria-pressed={isActive}
                aria-label={`Select ${product.title}`}
              >
                <img
                  src={product.imageSrc}
                  alt=""
                  aria-hidden="true"
                  className="selectedImg h-9 w-9"
                />

                <div className="ml-1.5 flex flex-col items-start gap-0.5">
                  <h5 className="font-bold text-[11px]">{product.title}</h5>
                  <p className="leading-none text-[10px]">
                    {product.description}
                  </p>
                </div>
              </button>

              {user && (
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="addCart ml-auto h-[13px] w-[13px]"
                  aria-label={`Add ${product.title} to cart`}
                >
                  <img
                    src={addCart}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodTrayMobile;