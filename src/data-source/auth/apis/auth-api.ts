import interceptor from "@/src/utils/network/interceptor/interceptor";
import { SignUpRequest } from "../models/requests/sign-up-request";
import { SignInRequest } from "../models/requests/sign-in-request";
import {
  BaseResponse,
  errorResponse,
} from "@/src/utils/network/models/common/base-response";
import { SignInResponse } from "../models/responses/sign-in-response";
import { AxiosError } from "axios";
import { ClientApiUrl } from "@/src/constants/api-url";

import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";
export async function signUpApi(data: SignUpRequest) {
  try {
    const result = await interceptor.post<BaseResponse>(
      ClientApiUrl.REGISTER,
      data
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function signInApi(data: SignInRequest) {
  try {
    const result = await interceptor.post<BaseResponse<SignInResponse>>(
      ClientApiUrl.LOGIN,
      data
    );
    if (result.data.data) {
      LocalStorageHelper.setUser(result.data.data);
    }
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}
