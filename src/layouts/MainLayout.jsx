import { Outlet, Link, useLocation } from "react-router-dom";
import useSettings from "../hooks/useSettings";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function MainLayout() {
  const path = useLocation().pathname;
const { settings } = useSettings();
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
    { name: "Tasks", path: "/tasks", icon: <ClipboardDocumentListIcon className="h-6 w-6" /> },
    { name: "Settings", path: "/settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* ==== GLASS SIDEBAR ==== */}
      <aside className="
        w-64 h-screen fixed left-0 top-0 p-6 flex flex-col
        bg-white/10 backdrop-blur-xl border-r border-white/20
        shadow-[4px_0_25px_rgba(0,0,0,0.25)]
      ">
        {/* Logo */}
        <h2 className="text-3xl font-extrabold text-white drop-shadow mb-10">
          Taskly <span className="text-blue-400">Pro</span>
        </h2>

        {/* Nav Items */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const active = path === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                  transition-all duration-200
                  ${active
                    ? "bg-blue-600/60 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30 translate-x-2"
                    : "text-gray-300 hover:bg-white/10 hover:translate-x-2"}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        {/* Logout Button */}
{/* Logout Button */}
<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="
    mt-auto flex items-center gap-3 px-4 py-3
    rounded-xl font-semibold
    text-red-500
    hover:bg-red-600/20 hover:text-red-400
    transition-all duration-200
  "
>
  {/* Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3"
    />
  </svg>

  {/* RED LOGOUT TEXT */}
  {!settings.sidebarCollapsed && (
    <span className="text-red-500">Logout</span>
  )}
</button>

      </aside>

      {/* ==== MAIN CONTENT ==== */}
      <main className="flex-1 ml-64 p-10">
        <Outlet />
      </main>
    </div>
  );
}
