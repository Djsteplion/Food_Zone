import Fz from "./Fz";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/store";
import { Eye, EyeOff } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
};

const API_URL = import.meta.env.VITE_API_URL;

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    setLoading(true);

    const passwordValid =
      password.length >= 6 &&
      /[A-Za-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!passwordValid) {
      setError(
        "Password must be at least 6 characters and contain a letter, number, and special character."
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      setSuccess(true);
      setAccount(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setSuccess(false);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      
      const setUser = useAuthStore.getState().setUser;
      
      setUser(result.data.user);
      navigate("/");

      //navigate("/cart");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const result = await response.json();

      setUser(result.data.user);
    } catch {
      setUser(null);
    }
  };

  checkAuth();
}, []);

  return (
    	<div  className="w-full flex flex-row items-center lg:pl-12.5">
        <Fz />
        {account? 
        (
            <>
                <div className="w-full  ml-3 mt-3 mr-3 flex items-center justify-center max-h-screen bg-gray-100 p-1 lg:ml-30 lg:max-w-100">
                {/* Main Card */}
                <div className="w-full bg-white rounded-[10px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:min-w-100 lg:rounded-3xl">
                    
                    {/* Header */}
                    <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                    <p className="text-gray-500 text-sm">Join Food Zone Today!</p>
                    </div>
                    {error && <p className="text-[red]">{error}</p>}
                    {/* Form */}
                    <form className="space-y-4">
                    <div>
                        <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    <div>
                        <input
                        type="text"
                        placeholder="firstname"
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        />
                    </div>

                    <div>
                        <input
                        type="text"
                        placeholder="lastname"
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                        />
                    </div>

                   <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full px-5 py-4 pr-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full px-5 py-4 pr-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>


                    {loading ? 
                      <div className="loader w-full">
                      </div>
                        : 
                        <button
                            type="submit" 
                            className="w-full py-4 disabled:cursor-not-allowed bg-[#FF8A3D] text-white font-bold rounded-full shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm mt-4"
                            disabled = {loading|| !email || !password || !confirmPassword  || !firstname || !lastname}
                            onClick={handleSignUp}
                        >
                            {loading ? 'Please Wait' : 'Sign Up'}
                        </button>
                      }
                    </form>

                    {/* Footer Link */}
                    <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm" onClick={() => setAccount(false)}>
                        Already have an account? <span className="text-orange-500 font-semibold cursor-pointer">Sign In</span>
                    </p>
                    </div>
                </div>
             </div>

            </>
        ) : (
             <div className="w-full mr-[12px] mt-[12px] ml-[12px] flex items-center justify-center max-h-screen bg-gray-100 p-1 lg:ml-[120px] lg:max-w-[400px]">
                {/* Main Card */}
                <div className="w-full bg-[white] rounded-[10px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.09)] lg:min-w-[400px] lg:rounded-3xl">
                    
                    {/* Header */}
                    <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Sign In To Your Account</p>
                    </div>
                    {success && <p className="text-[#18e418]">Sign Up was successful✅ <br/>
                        <span className="text-[#ff9100]">You can proceed to login</span></p>}
                     {error && <p className="text-red-500">{error}</p>}
                    {/* Form */}
                    <form className="space-y-4">
                    <div>
                        <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    <div>
                        <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>


                  {loading ? 
                     <div className="loader w-full">
                     </div>
                   : 
                    <button
                        type="submit" 
                        className="w-full py-4 bg-[#FF8A3D] text-white font-bold disabled:cursor-not-allowed rounded-full shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm mt-4"
                        disabled = {loading || !email || !password}
                        onClick={handleLogin}
                    >
                       Sign In
                    </button>
                   }
                    </form>

                    {/* Footer Link */}
                    <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm" onClick={() => setAccount(true)}>
                        Don't have an account? <span className="text-orange-500 font-semibold cursor-pointer">Sign Up</span>
                    </p>
                    </div>
                </div>
             </div>
        )}
    </div>
  );
};

export default Authentication;