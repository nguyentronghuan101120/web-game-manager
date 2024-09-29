import Image from "next/image";
import navBarLogo from "@/public/assets/nav-bar-logo.webp";

export default function Logo() {
  return (
    <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
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
