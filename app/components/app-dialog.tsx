// ConfirmDialog.js
import React from "react";
import AppButton from "./app-button";
import { TextConstant } from "@/src/constants/text-constant";

const AppDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  type = "confirm",
  children,
  className = "", // Added className prop
  title, // Added title prop
  subtitle, // Added subtitle prop
}: {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  type: "confirm" | "form";
  children?: React.ReactNode; // Make children optional
  className?: string; // Make className optional
  title?: string; // Make title optional
  subtitle?: string; // Make subtitle optional
}) => {
  if (!isOpen) return null;

  if (type === "form" && !children) {
    throw new Error("Children must be provided when type is 'form'.");
  }

  if (type === "confirm" && (!title || !subtitle)) {
    throw new Error(
      "Title and subtitle must be provided when type is 'confirm'."
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 backdrop-blur-sm">
      <div
        className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transform transition-all ${
          className || "max-w-sm w-full"
        }`}
      >
        {type === "confirm" ? (
          <ConfirmDialogContent
            title={title || TextConstant.ARE_YOU_SURE}
            subtitle={
              subtitle || TextConstant.DO_YOU_WANT_TO_PROCEED_WITH_THIS_ACTION
            }
            onConfirm={onConfirm ?? (() => {})}
            onCancel={onCancel ?? (() => {})}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

const ConfirmDialogContent = ({
  title,
  subtitle,
  onConfirm,
  onCancel,
}: {
  title: string;
  subtitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
        {title}
      </h2>
      <p className="text-gray-900 dark:text-white mt-2 text-center">
        {subtitle}
      </p>
      <div className="flex justify-end space-x-3 mt-4">
        <AppButton variant="secondary" onClick={onCancel}>
          Cancel
        </AppButton>

        <AppButton variant="primary" onClick={onConfirm}>
          Confirm
        </AppButton>
      </div>
    </>
  );
};

export default AppDialog;
