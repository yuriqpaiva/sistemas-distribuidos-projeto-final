import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LogResponse } from "../page";

export function LogsTable({ logs }: { logs: LogResponse[] }) {
  return (
    <div className="flex flex-col gap-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IP</TableHead>
            <TableHead>Rota</TableHead>
            <TableHead>Data de criação</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tamanho</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.ip}</TableCell>
              <TableCell>{item.pathname}</TableCell>
              <TableCell>{item.createdAt.toString()}</TableCell>
              <TableCell>{item.statusReq}</TableCell>
              <TableCell>{item?.dataLength ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
