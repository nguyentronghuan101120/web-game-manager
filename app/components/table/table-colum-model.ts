import { ReactNode } from "react";

export interface TableColumnModel {
  name: string;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?: (data: any) => string | ReactNode;
}
