import React, {createContext, useContext, useEffect, useState} from 'react';
import {ClimateMode, ClimateSettings} from '../types';
import {loadItem, saveItem, KEYS} from '../utils/storage';

const DEFAULT: ClimateSettings = {
  temperature:     22,
  mode:            'Auto',
  onTimerEnabled:  false,
  onTime:          '07:00',
  offTimerEnabled: false,
  offTime:         '23:00',
};

interface ClimateContextValue {
  settings:    ClimateSettings;
  setTemp:     (t: number) => void;
  setMode:     (m: ClimateMode) => void;
  setOnTimer:  (enabled: boolean, time?: string) => void;
  setOffTimer: (enabled: boolean, time?: string) => void;
  applySettings:() => void;
}

const Ctx = createContext<ClimateContextValue | null>(null);

export function ClimateProvider({children}: {children: React.ReactNode}) {
  const [settings, setSettings] = useState<ClimateSettings>(DEFAULT);

  useEffect(() => {
    loadItem<ClimateSettings>(KEYS.CLIMATE, DEFAULT).then(s => setSettings(s));
  }, []);

  const persist = (next: ClimateSettings) => {
    setSettings(next);
    saveItem(KEYS.CLIMATE, next);
  };

  const setTemp     = (t: number) => persist({...settings, temperature: Math.max(16, Math.min(30, t))});
  const setMode     = (m: ClimateMode) => persist({...settings, mode: m});
  const setOnTimer  = (enabled: boolean, time?: string) =>
    persist({...settings, onTimerEnabled: enabled, onTime: time ?? settings.onTime});
  const setOffTimer = (enabled: boolean, time?: string) =>
    persist({...settings, offTimerEnabled: enabled, offTime: time ?? settings.offTime});
  const applySettings = () => saveItem(KEYS.CLIMATE, settings);

  return (
    <Ctx.Provider value={{settings, setTemp, setMode, setOnTimer, setOffTimer, applySettings}}>
      {children}
    </Ctx.Provider>
  );
}

export function useClimate(): ClimateContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {throw new Error('useClimate must be inside ClimateProvider');}
  return ctx;
}
