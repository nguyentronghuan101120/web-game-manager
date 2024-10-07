import Image from "next/image";
import navBarLogo from "@/public/assets/nav-bar-logo.webp";
import { ClientRoutes } from "@/src/constants/routes";

export default function Logo() {
  return (
    <a href={ClientRoutes.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
      <Image
        src={navBarLogo}
        height={80}
        width={80}
        alt=""
        className="rounded-full"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Ninja school online
      </span>
    </a>
  );
}
