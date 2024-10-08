/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import AppDropdown from "@/app/components/app-dropdown";
import AppButton from "../app-button";
import { Input } from "@nextui-org/react";
import { TextConstant } from "@/src/constants/text-constant";

const TopContent = ({ onAdd }: { onAdd?: () => void }) => {
  const columns = [
    { label: "Column 1", value: "Column1" },
    { label: "Column 2", value: "Column2" },
  ];

  const statusOptions = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<FaSearch />}
        />
        <div className="flex gap-3">
          <AppDropdown
            options={statusOptions}
            selected={statusOptions[0]}
            setSelected={(selected) => {
              console.log(selected);
            }}
          />
          <AppDropdown
            options={columns}
            selected={columns[0]}
            setSelected={(selected) => {
              console.log(selected);
            }}
          />
          <AppButton variant="primary" endIcon={<FaPlus />} onClick={onAdd}>
            {TextConstant.ADD_NEW}
          </AppButton>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          {TextConstant.TOTAL} 10 {TextConstant.USERS}
        </span>
        <label className="flex items-center text-default-400 text-small">
          {TextConstant.ROWS_PER_PAGE}:
          <select className="bg-transparent outline-none text-default-400 text-small">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default TopContent;
