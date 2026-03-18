import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useState } from "react";
import Button from "../Button";
import "./tables.css";
export default function UsersTable({ users, onEdit, onDelete }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    {
      header: "ID",
      accessorKey: "id_user",
    },
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="actions">
          <Button onClick={() => onEdit(row.original)} className="table">
            Editar
          </Button>

          <Button
            onClick={() => onDelete(row.original.id_user)}
            className="table"
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      {/* TABLA */}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}

                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div style={{ marginTop: "15px" }}>
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="table"
        >
          Inicio
        </Button>

        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="table"
        >
          Anterior
        </Button>

        <span style={{ margin: "0 10px" }}>
          Página{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="table"
        >
          Siguiente
        </Button>

        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="table"
        >
          Final
        </Button>
      </div>
    </div>
  );
}
