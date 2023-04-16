import clsx from 'clsx';
import { createContext, useContext, useMemo, useReducer, useState } from 'react';

const ThemeContext = createContext(null);
const ThemeContextDispatch = createContext(null);

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }

    return context;
};

const useThemeContextDispatch = () => {
    const context = useContext(ThemeContextDispatch);

    if (context === null) {
        throw new Error('useThemeContextDispatch must be used within a ThemeContextDispatch');
    }

    return context;
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggle = () => {
        setTheme(current => {
            return current === 'light' ? 'dark' : 'light';
        });
    };

    const setLight = () => {
        setTheme('light');
    };

    const setDark = () => {
        setTheme('dark');
    };

    const values = useMemo(() => ({
        isDark:  theme === 'dark',
        isLight: theme === 'light',
        theme,
    }), [theme]);

    const dispatchValues = useMemo(() => ({
        setLight,
        setDark,
        toggle,
    }), []);

    return (
        <ThemeContext.Provider value={values}>
            <ThemeContextDispatch.Provider value={dispatchValues}>
                {children}
            </ThemeContextDispatch.Provider>
        </ThemeContext.Provider>
    );
};

const ThemedLayout = ({ children }) => {
    const { isDark } = useThemeContext(ThemeContext);
    return (
        <div className={clsx('theme-app', { 'dark-theme-app': isDark })}>
            {children}
        </div>
    );
};

const ForceLightMode = () => {
    console.log('%c FORCE LIGHT', 'background: #D1FFFA; color: #000000');
    const { setLight } = useThemeContextDispatch(ThemeContext);
    return <button onClick={() => setLight()}>Force light</button>;
};

const ForceDarkMode = () => {
    console.log('%c FORCE DARK', 'background: #232323; color: #FFFFFF');
    const { setDark } = useThemeContextDispatch(ThemeContext);
    return <button onClick={() => setDark()}>Force dark</button>;
};

const ToggleMode = () => {
    const { isDark } = useThemeContext(ThemeContext);
    const { toggle } = useThemeContextDispatch(ThemeContext);
    return <button onClick={toggle}>{isDark ? '🌞' : '🌙'}</button>;
};

const CurrentModeInfo = () => {
    const { theme } = useThemeContext(ThemeContext);
    return (
        <div>
            Current theme: <b>{theme}</b>
        </div>
    );
};

const ForceThemeButtons = () => (
    <div style={{ marginTop: 32 }}>
        <ForceLightMode />
        <ForceDarkMode />
    </div>
);

const App = () => {
    const [count, increment] = useReducer((curr) => curr + 1, 0);
    return (
        <div>
            <p>Not in dark mode</p>
            <button onClick={increment}>{count}</button>
            <ThemeProvider>
                <ThemedLayout>
                    <ToggleMode />

                    <h1>Articles</h1>
                    <h3>What is useContext ?</h3>
                    <p>
                        useContext is used to pass data through the component tree without
                        having to pass props down manually at every level.
                    </p>
                    <hr />
                    <CurrentModeInfo />
                    <ForceThemeButtons />
                </ThemedLayout>

            </ThemeProvider>
        </div>
    );
};

export default App;
