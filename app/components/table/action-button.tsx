import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaEllipsisV } from "react-icons/fa";

export default function ActionButton() {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <FaEllipsisV className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
