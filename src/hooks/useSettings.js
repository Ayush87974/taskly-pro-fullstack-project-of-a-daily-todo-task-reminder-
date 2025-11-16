import { useEffect, useState } from "react";

export default function useSettings() {
  const [settings, setSettings] = useState({
    theme: localStorage.getItem("theme") || "dark",
    sidebarCollapsed: JSON.parse(localStorage.getItem("sidebarCollapsed") || "false"),
    animations: JSON.parse(localStorage.getItem("animations") || "true"),
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("theme", settings.theme);
    localStorage.setItem("sidebarCollapsed", settings.sidebarCollapsed);
    localStorage.setItem("animations", settings.animations);
  }, [settings]);

  return { settings, setSettings };
}
