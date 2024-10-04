// ConfirmDialog.js
import React from "react";
import Button from "./button";

const ConfirmDialog = ({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900  p-6 rounded-lg shadow-lg transform transition-all max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white ">
          Are you sure?
        </h2>
        <p className="text-gray-900 dark:text-white  mt-2">
          Do you want to proceed with this action?
        </p>
        <div className="flex justify-end space-x-3 mt-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
