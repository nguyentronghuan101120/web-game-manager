import interceptor from "@/src/utils/network/interceptor/interceptor";
import {
  BaseResponse,
  errorResponse,
} from "@/src/utils/network/models/common/base-response";
import { AxiosError } from "axios";
import { UserResponse } from "../models/responses/user-response";
import { UserEditorRequest } from "../models/requests/user-editor-request";
import { AdminApiUrl } from "@/src/constants/api-url";
import { PaginationAndTotalModel } from "@/src/utils/network/models/common/paginationAndTotal.model";

export async function getUsersApi(pagination: PaginationAndTotalModel) {
  try {
    const result = await interceptor.get<BaseResponse<UserResponse[]>>(
      AdminApiUrl.USERS + `?page=${pagination.page}&limit=${pagination.limit}`
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function createUserApi(user: UserEditorRequest) {
  try {
    const result = await interceptor.post<BaseResponse<UserResponse>>(
      AdminApiUrl.USERS,
      user
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function editUserApi(id: number, user: UserEditorRequest) {
  try {
    const result = await interceptor.put<BaseResponse<UserResponse>>(
      AdminApiUrl.USERS + `/${id}`,
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
      AdminApiUrl.USERS + `/${userId}`
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}

export async function searchUserApi(username: string) {
  try {
    const result = await interceptor.get<BaseResponse<UserResponse[]>>(
      AdminApiUrl.USERS + `/search?username=${username}`
    );
    return result;
  } catch (error) {
    throw errorResponse(error as AxiosError);
  }
}
