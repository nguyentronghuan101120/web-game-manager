import React from "react";
import AppButton from "./app-button";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";

const ErrorLabel: React.FC<{ error: BaseResponse }> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex items-center p-2 bg-red-100 border border-red-400 text-red-700 rounded relative justify-center"
        role="alert"
      >
        <span className="font-bold">Error:</span>
        <span className="ml-2">{error.statusCode}</span>
        <span className="ml-2">{error.message}</span>
      </div>

      <AppButton
        onClick={() => {
          window.location.reload();
        }}
        className="max-w-[300px] mt-4"
      >
        Reload
      </AppButton>
    </div>
  );
};

export default ErrorLabel;
