import React, {createContext, useContext, useEffect, useState} from 'react';
import {loadItem, saveItem, KEYS} from '../utils/storage';

interface RequestsState {
  doNotDisturb:     boolean;
  housekeeping:     boolean;
  quantities:       Record<number, number>;
  setDoNotDisturb:  (v: boolean) => void;
  setHousekeeping:  (v: boolean) => void;
  setQuantity:      (id: number, q: number) => void;
  getQuantity:      (id: number) => number;
}

const Ctx = createContext<RequestsState | null>(null);

export function RequestsProvider({children}: {children: React.ReactNode}) {
  const [doNotDisturb, setDNDState]    = useState(false);
  const [housekeeping, setHKState]     = useState(false);
  const [quantities,   setQuantities]  = useState<Record<number, number>>({});

  useEffect(() => {
    loadItem<boolean>(KEYS.DO_NOT_DISTURB, false).then(v  => setDNDState(v));
    loadItem<boolean>(KEYS.HOUSEKEEPING,   false).then(v  => setHKState(v));
    loadItem<Record<number,number>>(KEYS.REQUEST_QUANTITIES, {}).then(v => setQuantities(v));
  }, []);

  const setDoNotDisturb = (v: boolean) => {
    setDNDState(v);
    saveItem(KEYS.DO_NOT_DISTURB, v);
  };
  const setHousekeeping = (v: boolean) => {
    setHKState(v);
    saveItem(KEYS.HOUSEKEEPING, v);
  };
  const setQuantity = (id: number, q: number) => {
    setQuantities(prev => {
      const next = {...prev, [id]: q};
      saveItem(KEYS.REQUEST_QUANTITIES, next);
      return next;
    });
  };
  const getQuantity = (id: number) => quantities[id] ?? 1;

  return (
    <Ctx.Provider value={{doNotDisturb, housekeeping, quantities, setDoNotDisturb, setHousekeeping, setQuantity, getQuantity}}>
      {children}
    </Ctx.Provider>
  );
}

export function useRequests(): RequestsState {
  const ctx = useContext(Ctx);
  if (!ctx) {throw new Error('useRequests must be inside RequestsProvider');}
  return ctx;
}
