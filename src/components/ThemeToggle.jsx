import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === "dark" ? "Claro" : "Oscuro";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${nextThemeLabel.toLowerCase()}`}
      title={`Cambiar a modo ${nextThemeLabel.toLowerCase()}`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === "dark" ? "☀" : "☾"}
      </span>
      <span>{nextThemeLabel}</span>
    </button>
  );
}
