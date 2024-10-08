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
  const isSignInOrSignUpPage =
    window.location.pathname.includes("sign-in") ||
    window.location.pathname.includes("sign-up");
  const isAdminPage = window.location.pathname.includes("admin");

  useEffect(() => {
    const storedUserData = LocalStorageHelper.getUser();

    if (storedUserData) {
      setIsLoggedIn(true);

      if (storedUserData.user.role === 1) {
        setIsAdmin(true);

        return;
      }

      if (!isAdmin) {
        window.location.href = ClientRoutes.HOME;
        return;
      }

      window.location.href = ClientRoutes.HOME;
      return;
    } else if (!storedUserData && !isSignInOrSignUpPage) {
      window.location.href = ClientRoutes.HOME;
      return;
    }
  }, [isAdmin, isSignInOrSignUpPage]);

  if (!isLoggedIn && !isSignInOrSignUpPage) {
    return <></>;
  } else if (isLoggedIn && !isAdmin && (isSignInOrSignUpPage || isAdminPage)) {
    return <></>;
  } else {
    return <>{children}</>;
  }
}
