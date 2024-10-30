"use client"

import { ColumnDef } from "@tanstack/react-table"

import { AffiliateProgram } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<AffiliateProgram>[] = [
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    meta: "Brand",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.brand.name}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "programName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program name" />
    ),
    meta: "Program name",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("programName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "commissionRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission Rate" />
    ),
    meta: "Commission Rate",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("commissionRate")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "terms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Terms" />
    ),
    meta: "Terms",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate text-ellipsis font-medium">
            {row.getValue("terms")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "programUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    meta: "URL",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate text-ellipsis font-medium">
            {row.getValue("programUrl")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "validFrom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valid time" />
    ),
    meta: "Valid time",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate text-ellipsis font-medium">
            {row.original.validFrom.toLocaleDateString()} - {row.original.validUntil.toLocaleDateString()}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
