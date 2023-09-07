import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "@/types";
import { useNavigate } from "react-router-dom";

export function DocsTable({ docs }: { docs: Doc[] }) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {docs.map((doc) => (
          <TableRow
            onClick={() => {
              navigate(`/docs/${doc.id}`);
            }}
            key={doc.id}
            className="cursor-pointer"
          >
            <TableCell className="font-medium">{doc.title}</TableCell>
            <TableCell>{`${(doc.size / 1000).toFixed(2)} KB`}</TableCell>
            <TableCell className="text-right">
              {new Date(doc.updated_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
