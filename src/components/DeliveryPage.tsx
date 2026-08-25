import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryPage = () => {

 const [name, setName] = useState('');
 const [address, setAddress] = useState('');  
 const [city, setCity] = useState('');   
 const [phoneNumber, setPhoneNumber] = useState('');  

// Hook to handle programmatic navigation
const navigate = useNavigate();

// Function to handle form submission and validation
const handleSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault(); // Prevents the browser from reloading

  if (name && address && city && phoneNumber) {
    localStorage.setItem(
      "pending-delivery",
      JSON.stringify({
        name,
        phone: phoneNumber,
        city,
        address,
      })
    );

    navigate("/payment");
  } else {
  alert("Fill In All Fields Before Proceeding.");
  }
};

  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-100 p-1">
      {/* Delivery Card */}
      <div className="w-full mt-[12px] mr-[12px] ml-[12px] bg-white rounded-[5px] px-3 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:rounded-[10px] lg:px-8 lg:py-8 lg:max-w-[490px] lg:mt-[0px]">
        
        {/* Header */}
        <div className="mb-5 lg:mb-8">
          <h1 className="text-[16px] font-bold text-gray-900 mb-[3px] lg:text-[20px] font lg:mb-2">Delivery Information</h1>
          <p className="text-gray-500 text-[12px] lg:text-sm">Please input the details below</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
         
          <div>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

           <div>
            <input
              type="number"
              placeholder="Enter your Phone Number"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Which City do yo live in?"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 lg:px-5 lg:py-4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button
          onClick={handleSubmit}
            type="submit" 
            className="w-full py-4 bg-[#FF8A3D] text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm mt-4"
          >
           Proceed to checkout
          </button>
        </form>

      </div>
    </div>
  )
}

export default DeliveryPage