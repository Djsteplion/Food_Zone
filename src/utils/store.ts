
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import food1 from '../images/food 1.png';
import food2 from '../images/food 2.png';
import food3 from '../images/food 3.png';
import food4 from '../images/food 4.png';
//import food1b from '../images/food1b.png'; 
//import food1b from '../images/food1b.jpg';
//import food2b from '../images/food2b.png';
//import food3b from '../images/food3b.png';
//import food4b from '../images/food4b.png';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  initializeAuth: () => void;
}

interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageSrc: string;
    imageSrc2: string;
    count: number; // This acts as the quantity
}

export interface Order {
  id: string;
  transactionId: string;
  createdAt: string;
  status: "Confirmed" | "Preparing" | "Out for delivery" | "Delivered";
  paymentStatus: string;

  customer: {
    name: string;
    email: string;
    phone: string;
  };

  delivery: {
    city: string;
    address: string;
  };

  items: Product[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface ProductStore {
    products: Product[];
    cart: Product[];
    orders: Order[]; // ← here
    deliveryFee: number;
    

    // Actions
    addToCart: (product: Product) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addOrder: (order: any) => void; // ← here
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    
    // Derived State (Calculations)
    getTotalPrice: () => number;
    getGrandTotal: () => number;

    getTotalItems: () => number;

    clearCart: () => void;

    isMenuOpen: boolean; 
    toggleMenu: () => void;
    closeMenu: () => void;

    logout: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  initializeAuth: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        set({ user: null, loading: false });
        return;
      }

      const result = await response.json();

      set({
        user: result.data.user,
        loading: false,
      });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));

export const useProductStore = create<ProductStore>()(
    devtools(
        persist(
            (set, get) => ({
                products: [
                    { id: '1', title: "CAVIAR EXPRESS", count: 1, description: "The best caviar in the world", price: 20, imageSrc: food1, imageSrc2: food1 },
                    { id: '2', title: "BLUE BERRY", count: 1, description: "Fresh blueberries from farms", price: 20, imageSrc: food2, imageSrc2: food2 },
                    { id: '3', title: "BEEF STEAK", count: 1, description: "Premium beef steaks", price: 20, imageSrc: food3, imageSrc2: food3 },
                    { id: '4', title: "STRAWBERRY FINX", count: 1, description: "Organic strawberries", price: 20, imageSrc: food4, imageSrc2: food4 }
                ],
                cart: [],
                deliveryFee: 10,

                addToCart: (product) => set((state) => {
                    const existingItem = state.cart.find((item) => item.id === product.id);
                    
                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id 
                                    ? { ...item, count: item.count + 1 } 
                                    : item
                            ),
                        };
                    }
                    return { cart: [...state.cart, { ...product, count: 1 }] };
                }, false, 'addToCart'),

                removeFromCart: (id) => set((state) => ({
                    cart: state.cart.filter((item) => item.id !== id),
                }), false, 'removeFromCart'),

                increaseQuantity: (id) => set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id ? { ...item, count: item.count + 1 } : item
                    ),
                }), false, 'increaseQuantity'),

                decreaseQuantity: (id) => set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id && item.count > 1 
                            ? { ...item, count: item.count - 1 } 
                            : item
                    ),
                }), false, 'decreaseQuantity'),

                // Calculation Logic
                getTotalPrice: () => {
                    const cart = get().cart;
                    return cart.reduce((acc, item) => acc + item.price * item.count, 0);
                },

                getGrandTotal: () => {
                    return get().getTotalPrice() + get().deliveryFee;
                },

                getTotalItems: () => {
                    return get().cart.reduce((acc, item) => acc + item.count, 0);
                },

                orders: [],

                addOrder: (order) =>
                set(
                    (state) => ({
                    orders: [order, ...state.orders],
                    }),
                    false,
                    "addOrder"
                ),

                clearCart: () => set({ cart: [] }, false, 'clearCart'),

                isMenuOpen: false,
                toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

                closeMenu: () => set({ isMenuOpen: false }),
/*
                logout: async () => {
                    // 1. Clear Supabase Session
                    const { error } = await supabase.auth.signOut();
                    if (error) console.error("Error logging out:", error.message);
                    
                    // 2. Clear Local Store State
                    set({ cart: [] }, false, 'logout');

                    // 3. Optional: Clear the entire localStorage key if you want a hard reset
                    localStorage.removeItem('cart-storage');
                },
*/
                logout: async () => {
                    try {
                        await fetch(`${API_URL}/auth/logout`, {
                        method: "POST",
                        credentials: "include",
                        });

                        set({ cart: [] }, false, "logout");

                        //localStorage.removeItem("cart-storage");

                        window.location.href = "/auth";
                    } catch (error) {
                        console.error("Logout failed:", error);
                    }
                },
            }),
            { name: 'cart-storage' } // Persistence config
        ),
        { name: 'ProductStore' } // DevTools config
    )
);