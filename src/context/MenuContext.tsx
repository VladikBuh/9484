import React, {createContext, useContext, useEffect, useState} from 'react';
import {CartItem, MenuCategory} from '../types';
import {loadItem, saveItem, KEYS} from '../utils/storage';

interface MenuState {
  category:     MenuCategory;
  cart:         CartItem[];
  cartNote:     string;
  setCategory:  (c: MenuCategory) => void;
  setCartNote:  (n: string) => void;
  addToCart:    (item: Omit<CartItem, 'quantity'>) => void;
  increaseQty:  (id: number) => void;
  decreaseQty:  (id: number) => void;
  removeItem:   (id: number) => void;
  clearCart:    () => void;
  cartCount:    number;
  cartTotal:    number;
  getQty:       (id: number) => number;
}

const Ctx = createContext<MenuState | null>(null);

export function MenuProvider({children}: {children: React.ReactNode}) {
  const [category, setCatState] = useState<MenuCategory>('Breakfast');
  const [cart,     setCart]     = useState<CartItem[]>([]);
  const [cartNote, setNoteState]= useState('');

  useEffect(() => {
    loadItem<string>(KEYS.MENU_CATEGORY, 'Breakfast').then(v => setCatState(v as MenuCategory));
    loadItem<CartItem[]>(KEYS.CART_ITEMS, []).then(v => setCart(v));
    loadItem<string>(KEYS.CART_NOTE, '').then(v => setNoteState(v));
  }, []);

  const setCategory = (c: MenuCategory) => {
    setCatState(c);
    saveItem(KEYS.MENU_CATEGORY, c);
  };
  const setCartNote = (n: string) => {
    setNoteState(n);
    saveItem(KEYS.CART_NOTE, n);
  };

  const persistCart = (next: CartItem[]) => {
    setCart(next);
    saveItem(KEYS.CART_ITEMS, next);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.menuItemId === item.menuItemId);
      const next = idx >= 0
        ? prev.map((c, i) => i === idx ? {...c, quantity: c.quantity + 1} : c)
        : [...prev, {...item, quantity: 1}];
      saveItem(KEYS.CART_ITEMS, next);
      return next;
    });
  };

  const increaseQty = (id: number) => {
    setCart(prev => {
      const next = prev.map(c => c.menuItemId === id ? {...c, quantity: c.quantity + 1} : c);
      saveItem(KEYS.CART_ITEMS, next);
      return next;
    });
  };

  const decreaseQty = (id: number) => {
    setCart(prev => {
      const next = prev
        .map(c => c.menuItemId === id ? {...c, quantity: c.quantity - 1} : c)
        .filter(c => c.quantity > 0);
      saveItem(KEYS.CART_ITEMS, next);
      return next;
    });
  };

  const removeItem = (id: number) => persistCart(cart.filter(c => c.menuItemId !== id));
  const clearCart  = () => persistCart([]);
  const cartCount  = cart.reduce((s, c) => s + c.quantity, 0);
  const cartTotal  = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const getQty     = (id: number) => cart.find(c => c.menuItemId === id)?.quantity ?? 0;

  return (
    <Ctx.Provider value={{category, cart, cartNote, setCategory, setCartNote, addToCart, increaseQty, decreaseQty, removeItem, clearCart, cartCount, cartTotal, getQty}}>
      {children}
    </Ctx.Provider>
  );
}

export function useMenu(): MenuState {
  const ctx = useContext(Ctx);
  if (!ctx) {throw new Error('useMenu must be inside MenuProvider');}
  return ctx;
}
