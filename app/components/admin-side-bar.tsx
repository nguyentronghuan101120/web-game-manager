import Link from "next/link";
import { FaCog, FaSignOutAlt, FaTachometerAlt, FaUser } from "react-icons/fa";
import { useState } from "react";

export default function AdminSideBar({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-300 ease-in-out shadow-xl`}
    >
      <h1 className="text-2xl font-semibold text-center">Admin Dashboard</h1>
      <nav>
        {navItems.map((item, index) => (
          <AnimatedLink key={index} href={item.href} icon={item.icon}>
            {item.label}
          </AnimatedLink>
        ))}
      </nav>
    </div>
  );
}

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { href: "/admin/users", label: "Users", icon: <FaUser /> },
  { href: "/admin/settings", label: "Settings", icon: <FaCog /> },
  { href: "#", label: "Logout", icon: <FaSignOutAlt /> },
];

function AnimatedLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-gray-600 rounded-md group transition duration-150"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`transform transition-transform duration-300 ${
          hovered ? "scale-110" : "scale-100"
        }`}
      >
        {icon}
      </div>
      <span className="ml-3 group-hover:font-semibold transition duration-150">
        {children}
      </span>
    </Link>
  );
}
