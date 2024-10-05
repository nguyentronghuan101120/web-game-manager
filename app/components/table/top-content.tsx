/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import { FaSearch, FaChevronDown, FaPlus } from "react-icons/fa";

const TopContent = ({ onAdd }: { onAdd?: () => void }) => {
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
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FaChevronDown className="text-small" />}
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectionMode="multiple"
            >
              <DropdownItem>Active</DropdownItem>
              <DropdownItem>Inactive</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FaChevronDown className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectionMode="multiple"
            >
              <DropdownItem>Active</DropdownItem>
              <DropdownItem>Inactive</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" endContent={<FaPlus />} onClick={onAdd}>
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total 10 users</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
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
