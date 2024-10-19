import interceptor from "@/src/utils/network/interceptor/interceptor";
import { SignUpRequest } from "../models/requests/sign-up-request";
import { SignInRequest } from "../models/requests/sign-in-request";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { ApiUrls } from "@/src/constants/api-url";

import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";
import { SignInResponse } from "../models/responses/sign-in-response";

export class AuthApi {
  static async signUpApi(data: SignUpRequest) {
    const result = await interceptor.post<BaseResponse>(ApiUrls.REGISTER, data);
    return result;
  }

  static async signInApi(data: SignInRequest) {
    const result = await interceptor.post<BaseResponse<SignInResponse>>(
      ApiUrls.LOGIN,
      data
    );

    if (result.data.data) {
      LocalStorageHelper.setUser(result.data.data);
    }
    return result;
  }

  static async refreshTokenApi(refreshToken: string) {
    const result = await interceptor.post<BaseResponse<SignInResponse>>(
      ApiUrls.REFRESH_TOKEN,
      { data: refreshToken }
    );
    return result;
  }
}
