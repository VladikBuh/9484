import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {AppPhase, GuestOverlay, GuestTab} from './types';
import {saveItem, KEYS} from '../utils/storage';

interface NavigationState {
  phase:     AppPhase;
  activeTab: GuestTab;
  overlay:   GuestOverlay;
}

interface NavigationContextValue extends NavigationState {
  goToMain:    () => void;
  switchTab:   (tab: GuestTab) => void;
  pushOverlay: (overlay: GuestOverlay) => void;
  closeOverlay:() => void;
}

const Ctx = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase,     setPhase]     = useState<AppPhase>('Loader');
  const [activeTab, setActiveTab] = useState<GuestTab>('HomeTab');
  const [overlay,   setOverlay]   = useState<GuestOverlay>({type: 'none'});

  useEffect(() => {
    setTimeout(() => setPhase('Onboarding'), 5000);
  }, []);

  const goToMain = useCallback(async () => {
    await saveItem(KEYS.ONBOARDING_DONE, true);
    setPhase('Main');
  }, []);

  const switchTab   = useCallback((tab: GuestTab) => {
    setActiveTab(tab);
    setOverlay({type: 'none'});
  }, []);

  const pushOverlay  = useCallback((o: GuestOverlay) => setOverlay(o), []);
  const closeOverlay = useCallback(() => setOverlay({type: 'none'}), []);

  return (
    <Ctx.Provider value={{phase, activeTab, overlay, goToMain, switchTab, pushOverlay, closeOverlay}}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppNavigation(): NavigationContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {throw new Error('useAppNavigation must be inside NavigationProvider');}
  return ctx;
}
