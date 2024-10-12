import { AxiosError } from "axios";
import { PaginationAndTotalModel } from "./paginationAndTotal.model";
export class BaseResponse<T = null> {
  statusCode: number;
  message: string;
  pagination?: PaginationAndTotalModel;
  data: T | null;

  constructor(
    statusCode: number,
    message: string,
    data: T | null,
    pagination?: PaginationAndTotalModel
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }
}

export function errorResponse(error: AxiosError) {
  return new BaseResponse(
    error.response?.status ?? 500,
    (error.response?.data as { message?: string })?.message ??
      "Something went wrong",
    null
  );
}
