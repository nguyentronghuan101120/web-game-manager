import { ClientRoutes } from "@/src/constants/routes";
import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";
import { useEffect } from "react";

export default function WithAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const storedUserData = LocalStorageHelper.getUser();
    if (storedUserData) {
      window.location.href = ClientRoutes.HOME;
    }
  }, []);
  return <>{children}</>;
}
