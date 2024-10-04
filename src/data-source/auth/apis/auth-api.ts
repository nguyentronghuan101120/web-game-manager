import interceptor from "@/src/utils/network/interceptor/interceptor";
import { SignUpRequest } from "../models/requests/sign-up-request";
import { loginUrl, registerUrl } from "@/src/constants/api-url";
import { SignInRequest } from "../models/requests/sign-in-request";
import {
  BaseResponse,
  errorResponse,
} from "@/src/utils/network/models/common/base-response";
import { SignInResponse } from "../models/responses/sign-in-response";
import { AxiosError } from "axios";
import { LocalStorageKey } from "@/src/constants/local-storage-key";

export async function signUpApi(data: SignUpRequest) {
  try {
    const result = await interceptor.post<BaseResponse>(registerUrl, data);
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function signInApi(data: SignInRequest) {
  try {
    const result = await interceptor.post<BaseResponse<SignInResponse>>(
      loginUrl,
      data
    );
    localStorage.setItem(
      LocalStorageKey.USERNAME,
      result.data.data?.username ?? ""
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}
