"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  unitPriceMinorUnits: number;
  currency: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity">; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "jpn-parts-cart";

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.productId === action.item.productId
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === action.item.productId
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity: action.quantity }],
      };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.productId !== action.productId),
      };
    case "SET_QUANTITY":
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.productId !== action.productId),
        };
      }
      return {
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotalMinorUnits: number;
  /** False until the initial localStorage read has completed. Pages that
   *  branch on an empty cart should wait for this to avoid a flash of
   *  "cart is empty" before the real (persisted) cart has loaded. */
  isHydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isHydrated, setIsHydrated] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "HYDRATE", items: JSON.parse(raw) as CartItem[] });
      }
    } catch {
      // Corrupted or inaccessible localStorage; start with an empty cart.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    // Skip the write on the very first effect pass: at that point `state`
    // is still the initial (pre-hydration) value, and writing it here would
    // race the hydrate effect above and clobber whatever was saved.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // localStorage unavailable (private browsing, quota); cart just won't persist.
    }
  }, [state.items]);

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const subtotalMinorUnits = state.items.reduce(
    (total, item) => total + item.unitPriceMinorUnits * item.quantity,
    0
  );

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotalMinorUnits,
    isHydrated,
    addItem: (item, quantity = 1) => dispatch({ type: "ADD_ITEM", item, quantity }),
    removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
    setQuantity: (productId, quantity) =>
      dispatch({ type: "SET_QUANTITY", productId, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
