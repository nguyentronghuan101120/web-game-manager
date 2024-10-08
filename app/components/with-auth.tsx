import { ClientRoutes } from "@/src/constants/routes";
import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NotFound from "../not-found";

export default function WithAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isSignInOrSignUpPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");
  const isAdminPage = pathname.includes("admin");

  const [pageLoaded, setPageLoaded] = useState<React.ReactNode>(<></>);

  useEffect(() => {
    const storedUserData = LocalStorageHelper.getUser();
    const isAdmin = storedUserData?.user.role === 1;

    if (isAdminPage) {
      if (!isAdmin) {
        setPageNotFound();
      } else {
        setPageLoaded(children);
      }
    } else if (isSignInOrSignUpPage && storedUserData) {
      redirectToHome();
    } else {
      setPageLoaded(children);
    }
  }, [isAdminPage, isSignInOrSignUpPage, children]);

  const redirectToHome = () => {
    window.location.href = ClientRoutes.HOME;
    return;
  };

  const setPageNotFound = () => {
    setPageLoaded(<NotFound />);
    return;
  };
  return <>{pageLoaded}</>;
}
