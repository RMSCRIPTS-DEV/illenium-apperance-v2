import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';
import Nui from './Nui';
import { useCallback, useEffect, useState } from 'react';
import defaultAppearanceTheme from './theme/defaultAppearanceTheme';

const defaultTheme: any = { ...defaultAppearanceTheme };

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const getCurrentTheme = (themeData: any) => {
    for (let index = 0; index < themeData.themes.length; index++) {
      if (themeData.themes[index].id === themeData.currentTheme) {
        return themeData.themes[index];
      }
    }
  };

  const loadTheme = useCallback(async () => {
    // In dev, use the local defaultTheme so edits here apply live
    if (!import.meta.env.PROD) {
      setCurrentTheme(defaultTheme);
      return;
    }

    const themeData = await Nui.post('get_theme_configuration');
    const serverTheme = getCurrentTheme(themeData);

    // Let the server theme fill in anything it cares about (e.g. id, fontFamily,
    // borderRadius, smoothBackgroundTransition), but always let the local
    // defaultTheme win for colors so any change made here applies in-game too.
    const nextTheme = serverTheme ? { ...serverTheme, ...defaultTheme } : defaultTheme;

    setCurrentTheme(nextTheme);
  }, []);

  useEffect(() => {
    loadTheme().catch(console.error);
  }, [loadTheme]);

  return (
    <NuiStateProvider>
      <ThemeProvider theme={currentTheme}>
        <Appearance />
        <GlobalStyles />
      </ThemeProvider>
    </NuiStateProvider>
  );
};

export default App;
