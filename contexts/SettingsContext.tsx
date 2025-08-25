import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Settings, LogoType, ButtonRadiusType, PrimaryButtonStyleType } from '../types';

// Utility to convert hex to HSL, necessary for dynamic themeing via CSS variables
const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};


const defaultSettings: Settings = {
  appName: 'Design Wiki',
  logo: 'default',
  primaryColor: '#C92D3B',
  buttonRadius: 'rounded-md',
  primaryButtonStyle: 'filled',
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const storedSettings = localStorage.getItem('design-wiki-settings');
      return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    } catch (error) {
      return defaultSettings;
    }
  });

  useEffect(() => {
    // Apply theme color
    const hsl = hexToHsl(settings.primaryColor);
    if (hsl) {
      const root = document.documentElement;
      root.style.setProperty('--color-accent-h', `${hsl.h}`);
      root.style.setProperty('--color-accent-s', `${hsl.s}%`);
      root.style.setProperty('--color-accent-l', `${hsl.l}%`);
    }

    // Save settings to local storage
    localStorage.setItem('design-wiki-settings', JSON.stringify(settings));

  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);
  
  const value = useMemo(() => ({ settings, updateSettings }), [settings, updateSettings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
