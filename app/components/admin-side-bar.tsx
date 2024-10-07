import Link from "next/link";
import { FaCog, FaSignOutAlt, FaTachometerAlt, FaUser } from "react-icons/fa";
import { useState } from "react";
import { AdminRoutes } from "@/src/constants/routes";
import { LogoutUser } from "@/src/utils/others/others-util";

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
          <AnimatedLink
            key={index}
            href={item.href}
            icon={item.icon}
            onClick={item.onClick}
          >
            {item.label}
          </AnimatedLink>
        ))}
      </nav>
    </div>
  );
}

const navItems = [
  {
    href: AdminRoutes.DASHBOARD,
    label: "Dashboard",
    icon: <FaTachometerAlt />,
  },
  { href: AdminRoutes.USERS, label: "Users", icon: <FaUser /> },
  { href: AdminRoutes.SETTINGS, label: "Settings", icon: <FaCog /> },
  {
    href: "#",
    label: "Logout",
    icon: <FaSignOutAlt />,
    onClick: LogoutUser,
  },
];

function AnimatedLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-gray-600 rounded-md group transition duration-150"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
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
