import useSettings from "../hooks/useSettings";

export default function Settings() {
  const { settings, setSettings } = useSettings();

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const changeTheme = (theme) => {
    setSettings((prev) => ({
      ...prev,
      theme
    }));
  };

  return (
    <div className="relative z-10">
      <h1 className="text-4xl font-bold mb-10">Settings ⚙️</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* THEME CARD */}
        <div className="neon-card p-8">
          <h2 className="text-2xl font-bold mb-4">Theme</h2>

          <div className="flex gap-5">
            <button
              className={`px-5 py-2 rounded-lg ${
                settings.theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-white/20 text-gray-300"
              }`}
              onClick={() => changeTheme("dark")}
            >
              Dark Mode
            </button>

            <button
              className={`px-5 py-2 rounded-lg ${
                settings.theme === "light"
                  ? "bg-blue-600 text-white"
                  : "bg-white/20 text-gray-300"
              }`}
              onClick={() => changeTheme("light")}
            >
              Light Mode
            </button>
          </div>
        </div>

        {/* SIDEBAR COLLAPSE */}
        <div className="neon-card p-8">
          <h2 className="text-2xl font-bold mb-4">Sidebar</h2>

          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.sidebarCollapsed}
              onChange={() => toggleSetting("sidebarCollapsed")}
              className="h-5 w-5"
            />
            <span className="text-lg">Collapse Sidebar</span>
          </label>
        </div>

        {/* ANIMATIONS */}
        <div className="neon-card p-8">
          <h2 className="text-2xl font-bold mb-4">Animations</h2>

          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.animations}
              onChange={() => toggleSetting("animations")}
              className="h-5 w-5"
            />
            <span className="text-lg">Enable Page Animations</span>
          </label>
        </div>

      </div>
    </div>
  );
}
