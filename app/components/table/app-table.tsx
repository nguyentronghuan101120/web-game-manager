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
import { TableColumnModel } from "./table-colum-model";
import { Key } from "react";
import ActionButton from "./action-button";
import TableHeaderCustom, {
  TableHeaderCustomProps,
} from "./table.header.custom";
import TableFooterCustom, {
  TableFooterCustomProps,
} from "./table.footer.custom";

interface AppTableProps {
  headerColumns: TableColumnModel[];
  items: any[];
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
  tableHeaderProps?: TableHeaderCustomProps;
  tableFooterProps?: TableFooterCustomProps;
}

const activatedColorMap: Record<string, ChipProps["color"]> = {
  1: "success",
  0: "danger",
};

export default function AppTable({
  headerColumns,
  items,
  onDelete,
  onEdit,
  tableHeaderProps,
  tableFooterProps,
}: AppTableProps) {
  const renderCell = (item: any, columnKey: Key) => {
    const key = (columnKey as string).toLowerCase();
    const cellValue = item[key];

    switch (key) {
      case "actions":
        return (
          <ActionButton
            onDelete={() => onDelete?.(item.id)}
            onEdit={() => onEdit?.(item.id)}
          />
        );

      case "activated":
        return (
          <Chip
            className="capitalize border-none gap-1  text-small"
            color={activatedColorMap[cellValue]}
            size="sm"
            variant="dot"
          >
            {cellValue === 1 ? "Activated" : "Inactivated"}
          </Chip>
        );
      default:
        return <p className=" text-small">{cellValue}</p>;
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
      bottomContent={
        <TableFooterCustom
          total={tableFooterProps?.total ?? 0}
          onPageChange={tableFooterProps?.onPageChange ?? (() => {})}
          onPrevious={tableFooterProps?.onPrevious ?? (() => {})}
          onNext={tableFooterProps?.onNext ?? (() => {})}
          itemsPerPage={tableFooterProps?.itemsPerPage ?? 0}
          page={tableFooterProps?.page ?? 0}
        />
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[650px]",
      }}
      selectionMode="multiple"
      topContent={
        <TableHeaderCustom
          onSearch={tableHeaderProps?.onSearch ?? (() => {})}
          onPageSizeChange={tableHeaderProps?.onPageSizeChange ?? (() => {})}
          onFilter={tableHeaderProps?.onFilter ?? (() => {})}
          onAdd={tableHeaderProps?.onAdd ?? (() => {})}
          total={tableHeaderProps?.total ?? 0}
        />
      }
      topContentPlacement="outside"
    >
      <TableHeader columns={updatedHeaderColumns}>
        {(column) => (
          <TableColumn
            key={column.name}
            align={column.name === "Actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            className={"font-bold text-sm"}
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
