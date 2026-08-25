import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !address.trim() || !city.trim() || !phoneNumber.trim()) {
      window.alert('Fill In All Fields Before Proceeding.');
      return;
    }

    localStorage.setItem(
      'pending-delivery',
      JSON.stringify({
        name: name.trim(),
        phone: phoneNumber.trim(),
        city: city.trim(),
        address: address.trim(),
      })
    );

    navigate('/payment');
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-100 p-1">
      {/* Delivery Card */}
      <main
        className="w-full mt-[12px] mr-[12px] ml-[12px] bg-white rounded-[5px] px-3 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:rounded-[10px] lg:px-8 lg:py-8 lg:max-w-[490px] lg:mt-[0px]"
        aria-labelledby="delivery-heading"
      >
        {/* Header */}
        <header className="mb-5 lg:mb-8">
          <h1
            id="delivery-heading"
            className="text-[16px] font-bold text-gray-900 mb-[3px] lg:text-[20px] lg:mb-2"
          >
            Delivery Information
          </h1>

          <p className="text-gray-500 text-[12px] lg:text-sm">
            Please input the details below
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="delivery-name" className="sr-only">
              Full name
            </label>

            <input
              id="delivery-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="delivery-phone" className="sr-only">
              Phone number
            </label>

            <input
              id="delivery-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Enter your Phone Number"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="delivery-city" className="sr-only">
              City
            </label>

            <input
              id="delivery-city"
              name="city"
              type="text"
              placeholder="Which City do yo live in?"
              autoComplete="address-level2"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="delivery-address" className="sr-only">
              Delivery address
            </label>

            <input
              id="delivery-address"
              name="address"
              type="text"
              placeholder="Enter your delivery address"
              autoComplete="street-address"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#FF8A3D] text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            Proceed to checkout
          </button>
        </form>
      </main>
    </div>
  );
};

export default DeliveryPage;