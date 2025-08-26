import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { Settings } from '../types';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

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
  loading: boolean;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  updateSettings: async () => {},
});

const GLOBAL_SETTINGS_ID = '_global';

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;

  const sanitizeSettings = (data: any): Settings => {
    return {
      appName: data.appName || defaultSettings.appName,
      logo: data.logo || defaultSettings.logo,
      primaryColor: data.primaryColor || defaultSettings.primaryColor,
      buttonRadius: data.buttonRadius || defaultSettings.buttonRadius,
      primaryButtonStyle: data.primaryButtonStyle || defaultSettings.primaryButtonStyle,
    };
  };

  // Effect to load settings from Firestore, dependent on auth state
  useEffect(() => {
    const fetchUserSettings = async (uid: string) => {
      setLoading(true);
      try {
        const settingsDocRef = doc(db, 'settings', uid);
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          const newSettings = sanitizeSettings(docSnap.data());
          setSettings(newSettings);
        } else {
          // If no settings exist for the user, initialize with defaults
          await setDoc(settingsDocRef, defaultSettings);
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
        setSettings(defaultSettings); // Fallback to defaults on error
      } finally {
        setLoading(false);
      }
    };

    const fetchGlobalSettings = async () => {
        setLoading(true);
        try {
            const settingsDocRef = doc(db, 'settings', GLOBAL_SETTINGS_ID);
            const docSnap = await getDoc(settingsDocRef);
            if (docSnap.exists()) {
                const newSettings = sanitizeSettings(docSnap.data());
                setSettings(newSettings);
            } else {
                // If no global settings exist, initialize with defaults and use them
                await setDoc(settingsDocRef, defaultSettings);
                setSettings(defaultSettings);
            }
        } catch (error) {
            console.error("Error fetching global settings:", error);
            setSettings(defaultSettings); // Fallback to defaults on error
        } finally {
            setLoading(false);
        }
    };

    if (!authLoading) {
      if (userId) {
        fetchUserSettings(userId);
      } else {
        fetchGlobalSettings();
      }
    }
  }, [userId, authLoading]);


  // Effect to apply theme CSS variables whenever settings change
  useEffect(() => {
    const hsl = hexToHsl(settings.primaryColor);
    if (hsl) {
      const root = document.documentElement;
      root.style.setProperty('--color-accent-h', `${hsl.h}`);
      root.style.setProperty('--color-accent-s', `${hsl.s}%`);
      root.style.setProperty('--color-accent-l', `${hsl.l}%`);
    }
  }, [settings.primaryColor]);

  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    if (!userId) {
      console.error("Cannot update settings: no user is logged in.");
      return;
    }
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    try {
      const settingsDocRef = doc(db, 'settings', userId);
      await setDoc(settingsDocRef, newSettings, { merge: true });
    } catch (error) {
      console.error("Error updating settings:", error);
      // Optional: handle error, maybe revert optimistic update
    }
  }, [settings, userId]);
  
  const value = useMemo(() => ({ settings, loading, updateSettings }), [settings, loading, updateSettings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
    return useContext(SettingsContext);
};