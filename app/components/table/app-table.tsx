/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chip,
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import BottomContent from "./bottom-content";
import TopContent from "./top-content";
import { TableColumnModel } from "./table-colum-model";
import { Key } from "react";
import ActionButton from "./action-button";

interface AppTableProps {
  headerColumns: TableColumnModel[];
  items: any[];
  onAdd?: () => void;
}

const activatedColorMap: Record<string, ChipProps["color"]> = {
  1: "success",
  0: "danger",
};

export default function AppTable({ headerColumns, items, onAdd }: AppTableProps) {
  const renderCell = (item: any, columnKey: Key) => {
    const key = (columnKey as string).toLowerCase();
    const cellValue = item[key];

    switch (key) {
      case "actions":
        return <ActionButton />;

      case "activated":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={activatedColorMap[cellValue]}
            size="sm"
            variant="dot"
          >
            {cellValue === 1 ? "Activated" : "Inactivated"}
          </Chip>
        );
      default:
        return <p className="text-bold text-small">{cellValue}</p>;
    }
  };

  // Add action column header
  const updatedHeaderColumns = [
    ...headerColumns,
    { name: "Actions", sortable: false },
  ];

  return (
    <Table
      isHeaderSticky
      bottomContent={<BottomContent />}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[650px]",
      }}
      selectionMode="multiple"
      topContent={<TopContent onAdd={onAdd} />}
      topContentPlacement="outside"
    >
      <TableHeader columns={updatedHeaderColumns}>
        {(column) => (
          <TableColumn
            key={column.name}
            align={column.name === "Actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No data found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
