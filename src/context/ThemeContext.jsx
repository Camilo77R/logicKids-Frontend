/**
 * ThemeProvider
 * -------------
 * Maneja el modo claro/oscuro en un solo lugar.
 *
 * POR QUÉ:
 * Login y register deben compartir el mismo tema sin pasar props por toda la app.
 */
import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./theme-context";

const THEME_STORAGE_KEY = "lk_theme";

// Arrancamos desde localStorage para respetar la última elección del usuario.
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "dark";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // `data-theme` deja que el CSS cambie tokens sin duplicar componentes.
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  const value = useMemo(
    () => ({
      theme,
      isDarkMode: theme === "dark",
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
