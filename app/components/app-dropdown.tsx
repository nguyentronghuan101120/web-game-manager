import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Option {
  label: string;
  value: string | number;
}

interface AppDropdownProps {
  options: Option[];
  selected: Option;
  setSelected: (selected: Option) => void;
  label?: string;
  className?: string;
}

export default function AppDropdown({
  options,
  selected,
  setSelected,
  label,
  className,
}: AppDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option>(selected);
  const handleSelect = (option: Option) => {
    setSelected(option);
    setSelectedOption(option);
  };

  const selectedLabel = selectedOption.label || "Select an option";

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && <label>{label}</label>}
      <Dropdown>
        <DropdownTrigger>
          <Button className="rounded flex items-center justify-between z-0">
            {selectedLabel} <FaChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Select Options"
          closeOnSelect={true}
          selectionMode="multiple"
          className="z-0"
        >
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`${
                selectedOption.value === option.value
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
