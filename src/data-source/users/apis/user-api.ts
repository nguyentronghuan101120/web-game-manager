import { usersUrl } from "@/src/constants/api-url";
import interceptor from "@/src/utils/network/interceptor/interceptor";
import {
  BaseResponse,
  errorResponse,
} from "@/src/utils/network/models/common/base-response";
import { AxiosError } from "axios";
import { UserResponse } from "../models/responses/user-response";
import { CreateUserRequest } from "../models/requests/create-user-request";
import { UpdateUserRequest } from "../models/requests/update-user-request";

export async function getUsersApi() {
  try {
    const result = await interceptor.get<BaseResponse<UserResponse[]>>(
      usersUrl
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function createUserApi(user: CreateUserRequest) {
  try {
    const result = await interceptor.post<BaseResponse<UserResponse>>(
      usersUrl,
      user
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function editUserApi(id: number, user: UpdateUserRequest) {
  try {
    const result = await interceptor.put<BaseResponse<UserResponse>>(
      usersUrl + `/${id}`,
      user
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function deleteUserApi(userId: number) {
  try {
    const result = await interceptor.delete<BaseResponse>(
      usersUrl + `/${userId}`
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}
