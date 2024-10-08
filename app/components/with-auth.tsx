import { ClientRoutes } from "@/src/constants/routes";
import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";
import { useEffect, useState } from "react";

export default function WithAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const storedUserData = LocalStorageHelper.getUser();
    const isAdmin = window.location.pathname.includes("admin");

    if (storedUserData) {
      setIsLoggedIn(true);

      if (isAdmin) {
        if (storedUserData.user.role === 1) {
          setIsAdmin(true);

          return;
        }
      } else {
        window.location.href = ClientRoutes.HOME;
        return;
      }

      window.location.href = ClientRoutes.HOME;
      return;
    } else if (isAdmin && !storedUserData) {
      window.location.href = ClientRoutes.SIGN_IN;
      return;
    }
  }, []);

  if (!isLoggedIn && isAdmin) {
    return <></>;
  }

  return <>{children}</>;
}
