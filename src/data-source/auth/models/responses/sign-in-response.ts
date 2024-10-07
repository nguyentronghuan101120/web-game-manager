import { UserResponse } from "@/src/data-source/users/models/responses/user-response";

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}
