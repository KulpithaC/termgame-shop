import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
// ถ้าต้องใช้ session ในอนาคต ค่อย import useAuth จาก '../context/AuthProvider'
// import { useAuth } from "../context/AuthProvider";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/products", label: "Products" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  // const { user } = useAuth(); // ตอนนี้ยังไม่ใช้ เพราะขอให้โชว์เฉพาะ Login

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-gray-900">
          TermGame<span className="text-gray-400">.shop</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ to, label, exact }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm px-2 py-1.5 rounded-md hover:bg-gray-100 ${
                isActive(to, exact) ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side: Login only */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-800"
          >
            Login
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-gray-300"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {links.map(({ to, label, exact }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md hover:bg-gray-100 ${
                  isActive(to, exact) ? "text-gray-900" : "text-gray-700"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-sm px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
