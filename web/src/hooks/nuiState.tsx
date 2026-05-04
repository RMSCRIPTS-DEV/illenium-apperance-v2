import React, { createContext, useState, useCallback, useContext, ReactNode, useEffect } from 'react';
import Locales from '../shared/interfaces/locales';
import { DEV_NUI_FIXTURE_LOCALES } from '../dev/fixtureLocales';

interface Display {
  appearance: boolean;
  asynchronous: boolean;
}

interface NuiState {
  display: Display;
  locales?: Locales;
}

interface NuiContextData {
  display: Display;
  setDisplay(value: Display): void;
  locales?: Locales;
  setLocales(value: Locales): void;
}

// In dev mode, show UI by default
const isDev = !import.meta.env.PROD;

const INITIAL_STATE: NuiState = {
  display: {
    appearance: isDev, // Auto-show in dev mode
    asynchronous: false,
  },
};

const NuiContext = createContext<NuiContextData>({} as NuiContextData);

const NuiStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<NuiState>(INITIAL_STATE);

  const setDisplay = useCallback(
    (value: Display) => {
      setData(state => ({
        ...state,
        display: {
          ...value,
        },
      }));
    },
    [setData],
  );

  const setLocales = useCallback(
    (value: Locales) => {
      setData(state => ({
        ...state,
        locales: value,
      }));
    },
    [setData],
  );

  // Set default locales in dev mode (same object as NUI mock)
  useEffect(() => {
    if (isDev && !data.locales) {
      setLocales(DEV_NUI_FIXTURE_LOCALES);
    }
  }, [isDev, data.locales, setLocales]);

  const contextValue = {
    display: data.display,
    setDisplay,
    locales: data.locales,
    setLocales,
  };

  return <NuiContext.Provider value={contextValue}>{children}</NuiContext.Provider>;
};

function useNuiState(): NuiContextData {
  const context = useContext(NuiContext);

  return context;
}

export { NuiStateProvider, useNuiState };
