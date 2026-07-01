import React, {createContext, useContext, useEffect, useState} from 'react';
import {loadItem, saveItem, KEYS} from '../utils/storage';

interface ExploreState {
  wishlistIds:   Set<number>;
  isWishlisted:  (id: number) => boolean;
  toggleWishlist:(id: number) => void;
}

const Ctx = createContext<ExploreState | null>(null);

export function ExploreProvider({children}: {children: React.ReactNode}) {
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadItem<number[]>(KEYS.WISHLIST_IDS, []).then(ids => setWishlistIds(new Set(ids)));
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveItem(KEYS.WISHLIST_IDS, Array.from(next));
      return next;
    });
  };

  const isWishlisted = (id: number) => wishlistIds.has(id);

  return (
    <Ctx.Provider value={{wishlistIds, isWishlisted, toggleWishlist}}>
      {children}
    </Ctx.Provider>
  );
}

export function useExplore(): ExploreState {
  const ctx = useContext(Ctx);
  if (!ctx) {throw new Error('useExplore must be inside ExploreProvider');}
  return ctx;
}
