import { ClientRoutes } from "@/src/constants/routes";
import { LocalStorageHelper } from "./local-storage-helper";

export function CheckUserLoggedIn() {
  const storedUserData = LocalStorageHelper.getUser();
  if (!storedUserData) {
    window.location.href = ClientRoutes.HOME;
  } else if (storedUserData && storedUserData.user.role !== 1) {
    window.location.href = ClientRoutes.HOME;
  }
}

export function LogoutUser() {
  LocalStorageHelper.removeUser();
  window.location.href = ClientRoutes.HOME;
}
