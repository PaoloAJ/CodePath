import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="dark-mode-toggle"
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--pico-muted-border-color)",
        background: "var(--pico-background-color)",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
