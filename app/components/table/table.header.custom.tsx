/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import AppDropdown from "@/app/components/app-dropdown";
import AppButton from "../app-button";
import { TextConstant } from "@/src/constants/text-constant";
import { usePathname } from "next/navigation";
import AppInput from "../input-field";

export type TableHeaderCustomProps = {
  onAdd: () => void;
  onSearch: (value: string) => void;
  onFilter?: (value: string) => void;
  onPageSizeChange?: (value: string) => void;
  total?: number;
};

const TableHeaderCustom = ({
  onSearch,
  onFilter,
  onPageSizeChange,
  total,
  onAdd,
}: TableHeaderCustomProps) => {
  const pathName = usePathname();

  const columns = [
    { label: "Column 1", value: "Column1" },
    { label: "Column 2", value: "Column2" },
  ];

  const statusOptions = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" },
  ];

  const pageSizeOptions = [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "20", value: "20" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-start">
        <AppInput
          placeholder="Search by name..."
          leadingIcon={<FaSearch />}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              onSearch?.((e.target as HTMLInputElement).value);
            }
          }}
          className="max-w-[300px]"
        />
        <div className="flex gap-3">
          <AppDropdown
            options={statusOptions}
            selected={statusOptions[0]}
            setSelected={(selected) => {
              onFilter?.(selected.value as string);
            }}
          />
          <AppDropdown
            options={columns}
            selected={columns[0]}
            setSelected={(selected) => {
              onFilter?.(selected.value as string);
            }}
          />
          <AppButton variant="primary" endIcon={<FaPlus />} onClick={onAdd}>
            {TextConstant.ADD_NEW}
          </AppButton>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          {TextConstant.TOTAL} {total} {pathName.split("/").pop()}
        </span>

        <label className="flex items-center text-default-400 text-small gap-2">
          {TextConstant.ROWS_PER_PAGE}:
          <AppDropdown
            options={pageSizeOptions}
            selected={pageSizeOptions[0]}
            setSelected={(selected) => {
              onPageSizeChange?.(selected.value as string);
            }}
            className="!max-h-[30px] "
          />
        </label>
      </div>
    </div>
  );
};

export default TableHeaderCustom;
