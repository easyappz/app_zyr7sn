import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  clear: () => {},
  subtotal: 0,
});

function arraysEqualIgnoreOrder(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  const aSorted = [...a].sort();
  const bSorted = [...b].sort();
  for (let i = 0; i < aSorted.length; i += 1) {
    if (aSorted[i] !== bSorted[i]) return false;
  }
  return true;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem = useCallback((product, quantity = 1, options = { syrups: [] }) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.product?._id === product._id && arraysEqualIgnoreOrder(it.options?.syrups || [], options?.syrups || []));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity, options: { syrups: options?.syrups || [] } }];
    });
  }, []);

  const updateItem = useCallback((index, patch) => {
    setItems((prev) => {
      const next = [...prev];
      const current = next[index];
      if (!current) return prev;
      next[index] = { ...current, ...patch, options: { ...current.options, ...(patch.options || {}) } };
      return next;
    });
  }, []);

  const removeItem = useCallback((index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + (Number(it.product?.price || 0) * Number(it.quantity || 0)), 0), [items]);

  const value = useMemo(() => ({ items, addItem, updateItem, removeItem, clear, subtotal }), [items, addItem, updateItem, removeItem, clear, subtotal]);

  return (
    <div data-easytag="id1-react/src/context/CartContext.jsx">
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </div>
  );
}
