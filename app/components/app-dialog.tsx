// ConfirmDialog.js
import React from "react";
import AppButton from "./app-button";

const AppDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  type = "confirm",
  children,
}: {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  type: "confirm" | "form";
  children?: React.ReactNode; // Make children optional
}) => {
  if (!isOpen) return null;

  if (type === "form" && !children) {
    throw new Error("Children must be provided when type is 'form'.");
  }
  if (!isOpen) return null;

  console.log(children);

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white dark:bg-gray-900  p-6 rounded-lg shadow-lg transform transition-all max-w-sm w-full">
        {type === "confirm" ? (
          <ConfirmDialogContent
            title="Are you sure?"
            message="Do you want to proceed with this action?"
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
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white ">
        {title}
      </h2>
      <p className="text-gray-900 dark:text-white  mt-2">{message}</p>
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
