/**
 * useTheme
 * --------
 * Atajo para leer y cambiar el tema actual desde cualquier componente.
 */
import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }

  return context;
};
