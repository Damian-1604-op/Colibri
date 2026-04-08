import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useState } from "react";
import Button from "../button/Button";
import "./tables.css";
export default function UsersTable({ users, onEdit, onDelete, onCreate }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });
  const columns = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Rol",
      accessorKey: "rol_name",
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="actions">
          <Button onClick={() => onEdit(row.original)} variant={"warning"}>
            Editar
          </Button>

          <Button
            onClick={() => onDelete(row.original.id_user)}
            variant="danger"
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
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,

    globalFilterFn: "includesString",

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      {/* BUSCADOR */}
      <div className="table__actionsContainer">
        <Button onClick={onCreate} variant="primary">
          Crear usuario
        </Button>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={globalFilter ?? ""}
          className="table__actionsContainer__input"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

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
          variant="pagination"
        >
          Inicio
        </Button>

        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="pagination"
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
          variant="pagination"
        >
          Siguiente
        </Button>

        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          variant="pagination"
        >
          Final
        </Button>
      </div>
    </div>
  );
}
