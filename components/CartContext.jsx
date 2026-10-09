"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, qty}
  const [wish, setWish] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("lumera-cart") || "[]"));
      setWish(JSON.parse(localStorage.getItem("lumera-wish") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("lumera-cart", JSON.stringify(items));
      localStorage.setItem("lumera-wish", JSON.stringify(wish));
    } catch {}
  }, [items, wish, ready]);

  const add = (id, qty = 1) => {
    setItems((c) => (c.find((i) => i.id === id) ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...c, { id, qty }]));
    setOpen(true);
  };
  const setQty = (id, qty) => setItems((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const remove = (id) => setItems((c) => c.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartCtx.Provider value={{ items, add, setQty, remove, clear, count, wish, toggleWish, open, setOpen }}>
      {children}
    </CartCtx.Provider>
  );
}
