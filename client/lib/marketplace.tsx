import React, { createContext, useContext, useEffect, useState } from "react";
import { products as initialProducts } from "@/lib/data";
import type { Product } from "@/components/marketplace/ProductCard";

type Transaction = {
  id: string;
  items: Product[];
  total: number;
  date: string;
};

type User = {
  id: string;
  name: string;
  email?: string;
  listings: Product[];
  transactions: Transaction[];
};

type MarketplaceContextValue = {
  products: Product[];
  addItem: (p: Omit<Product, "id">) => Product;
  getProduct: (id: string) => Product | undefined;
  user: User;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  cart: Product[];
  checkout: () => Transaction;
  submitContact: (payload: { name: string; email: string; message: string }) => void;
};

const MarketplaceContext = createContext<MarketplaceContextValue | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem("mx_products");
      if (raw) return JSON.parse(raw) as Product[];
    } catch (e) {
      /* ignore */
    }
    return initialProducts;
  });

  const [cart, setCart] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem("mx_cart");
      if (raw) return JSON.parse(raw) as Product[];
    } catch (e) {}
    return [];
  });

  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem("mx_user");
      if (raw) return JSON.parse(raw) as User;
    } catch (e) {}
    const defaultUser: User = {
      id: "u1",
      name: "Student User",
      email: undefined,
      listings: [],
      transactions: [],
    };
    return defaultUser;
  });

  useEffect(() => {
    localStorage.setItem("mx_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("mx_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("mx_user", JSON.stringify(user));
  }, [user]);

  const addItem = (p: Omit<Product, "id">) => {
    const id = String(Date.now());
    const newItem: Product = { ...p, id };
    setProducts((s) => [newItem, ...s]);
    setUser((u) => ({ ...u, listings: [newItem, ...u.listings] }));
    return newItem;
  };

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const addToCart = (id: string) => {
    const p = getProduct(id);
    if (!p) return;
    setCart((c) => [...c, p]);
  };

  const removeFromCart = (id: string) => {
    setCart((c) => {
      const ix = c.findIndex((it) => it.id === id);
      if (ix === -1) return c;
      const copy = [...c];
      copy.splice(ix, 1);
      return copy;
    });
  };

  const checkout = () => {
    const total = cart.reduce((s, it) => s + it.price, 0);
    const tx: Transaction = {
      id: String(Date.now()),
      items: cart,
      total,
      date: new Date().toISOString(),
    };
    setUser((u) => ({ ...u, transactions: [tx, ...u.transactions] }));
    setCart([]);
    return tx;
  };

  const submitContact = (payload: { name: string; email: string; message: string }) => {
    try {
      const existing = JSON.parse(localStorage.getItem("mx_contacts") || "[]");
      existing.unshift({ ...payload, date: new Date().toISOString() });
      localStorage.setItem("mx_contacts", JSON.stringify(existing));
    } catch (e) {
      console.error("Unable to save contact message", e);
    }
  };

  return (
    <MarketplaceContext.Provider
      value={{ products, addItem, getProduct, user, addToCart, removeFromCart, cart, checkout, submitContact }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error("useMarketplace must be used within MarketplaceProvider");
  return ctx;
}
