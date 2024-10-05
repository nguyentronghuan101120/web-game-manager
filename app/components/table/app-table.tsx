/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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

interface AppTableProps {
  headerColumns: TableColumnModel[];
  items: any[];
}

export default function AppTable({ headerColumns, items }: AppTableProps) {
  const renderCell = (item: any, columnKey: Key) => {
    const cellValue = item[(columnKey as string).toLowerCase()];
    return <p className="text-bold text-small">{cellValue}</p>;
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
      topContent={<TopContent />}
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
