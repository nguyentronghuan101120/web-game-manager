import { usersUrl } from "@/src/constants/api-url";
import interceptor from "@/src/utils/network/interceptor/interceptor";
import {
  BaseResponse,
  errorResponse,
} from "@/src/utils/network/models/common/base-response";
import { AxiosError } from "axios";
import { UserResponse } from "../models/responses/UserResponse";

export async function getUsersApi() {
  try {
    const result = await interceptor.get<BaseResponse<UserxResponse[]>>(usersUrl);
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}
