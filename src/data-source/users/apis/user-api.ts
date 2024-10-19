import interceptor from "@/src/utils/network/interceptor/interceptor";
import {
  BaseResponse,
} from "@/src/utils/network/models/common/base-response";
import { UserResponse } from "../models/responses/user-response";
import { UserEditorRequest } from "../models/requests/user-editor-request";
import { PaginationAndTotalModel } from "@/src/utils/network/models/common/paginationAndTotal.model";
import { ApiUrls } from "@/src/constants/api-url";

export class UserApi {
  static async getUsersApi(pagination: PaginationAndTotalModel) {
    const result = await interceptor.get<BaseResponse<UserResponse[]>>(
      ApiUrls.USERS + `?page=${pagination.page}&limit=${pagination.limit}`
    );
    return result;
  }

  static async createUserApi(user: UserEditorRequest) {
    const result = await interceptor.post<BaseResponse<UserResponse>>(
      ApiUrls.USERS,
      user
    );
    return result;
  }

  static async editUserApi(id: number, user: UserEditorRequest) {
    const result = await interceptor.put<BaseResponse<UserResponse>>(
      ApiUrls.USERS + `/${id}`,
      user
    );

    return result;
  }

  static async deleteUserApi(userId: number) {
    const result = await interceptor.delete<BaseResponse>(
      ApiUrls.USERS + `/${userId}`
    );
    return result;
  }

  static async searchUserApi(q: string, pagination: PaginationAndTotalModel) {
    const result = await interceptor.get<BaseResponse<UserResponse[]>>(
      ApiUrls.USERS +
        `/search?q=${q}&page=${pagination.page}&limit=${pagination.limit}`
    );
    return result;
  }
}
