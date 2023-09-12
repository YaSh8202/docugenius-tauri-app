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
import { UploadDocModal } from "./upload-doc-modal";

export function DocsTable({ docs }: { docs: Doc[] }) {
  const navigate = useNavigate();

  if (docs.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <h1 className="text-3xl font-bold mb-4">No Documents</h1>
        <p className="text-gray-500">Create a new document to get started</p>
        <div className="my-5">
          <UploadDocModal />
        </div>
      </div>
    );

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
