"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "type",
    label: "TYPE",
  },
  {
    key: "number_of_participants",
    label: "MAX PARTICIPANTS",
  },
  {
    key: "min_participants",
    label: "MIN PARTICIPANTS",
  },
  {
    key: "contribution_amount",
    label: "CONTRIBUTION AMOUNT",
  },
  {
    key: "contribution_frequency",
    label: "CONTRIBUTION FREQUENCY",
  },
  {
    key: "start_by_date",
    label: "ESTIMATED START BY DATE",
  },
  {
    key: "view",
    label: "",
  },
];

export default function RoscaDetailsTable({
  rows,
  type,
}: {
  rows: [
    {
      key: any;
      name: any;
      type: any;
      number_of_participants: any;
      contribution_amount: any;
      contribution_frequency: any;
      start_by_date: any;
      view: any;
      expired: any;
    }
  ];
  type: "Active" | "Pending";
}) {
  return (
    <Table
      aria-label="Example table with dynamic content"
      classNames={{
        th: " bg-default bg-opacity-45 text-white",
        // wrapper: "bg-gradient-to-tr from-rose-500 via-purple-500 to-slate-800",
        wrapper: "bg-default bg-opacity-30",
        tbody: "text-white",
        emptyWrapper: "text-white",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} align="center">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows}
        emptyContent={
          type === "Active"
            ? "No active circles so far..."
            : "No invites so far..."
        }
      >
        {(item) => (
          <TableRow key={item.key} className={item.expired ? "opacity-25" : ""}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
