import { AxiosError } from "axios";

export class BaseResponse<T = null> {
  statusCode: number;
  message: string;
  data: T | null;

  constructor(statusCode: number, message: string, data: T | null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
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
