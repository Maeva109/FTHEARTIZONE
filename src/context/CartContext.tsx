import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth

const BACKEND_URL = 'http://localhost:8000';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { isAuthenticated } = useAuth(); // Get auth state

  const fetchCart = () => {
    // Only fetch cart if authenticated
    if (!isAuthenticated) {
      setCartItems([]);
      setTotalAmount(0);
      return;
    }
    fetch(`${BACKEND_URL}/api/cart/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(data.items || []);
        const total = (data.items || []).reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        setTotalAmount(total);
      });
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  const addToCart = (productId: number, quantity = 1) => {
    fetch(`${BACKEND_URL}/api/cart/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
    })
      .then(res => res.json())
      .then(() => fetchCart());
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      clearCart();
    }
  }, [isAuthenticated]); // Re-run when auth state changes

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, fetchCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 