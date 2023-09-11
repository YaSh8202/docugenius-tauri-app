import { DocsTable } from "@/components/docs-table";
import api from "@/lib/api";
import { Doc } from "@/types";
import { useQuery } from "@tanstack/react-query";

const DocumentsPage = () => {

  const { data } = useQuery(
    ["docs"],
    async () => {
      const res = await api.get("/docs");
      return res.data.status === "success"
        ? (res.data.data.docs as Doc[])
        : null;
    },
    {}
  );

  return (
    <div className="w-full py-6 ">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Documents</h1>
        <DocsTable docs={data || []} />
      </div>
    </div>
  );
};

export default DocumentsPage;
