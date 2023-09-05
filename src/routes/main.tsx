import api from "@/lib/api";
import { Doc } from "@/types";
import { Link, useLoaderData } from "react-router-dom";

export const docsLoader = async () => {
  const res = await api.get("/docs");
  console.log("docs", res.data);
  return res.data.status === "success" ? (res.data.data.docs as Doc[]) : null;
};

const DocumentsPage = () => {
  const data = useLoaderData() as Doc[];
  console.log("data", data);

  return (
    <div className="w-full py-6 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Documents</h1>
        {data?.map((doc: Doc) => (
          <div key={doc.id} className="flex flex-row items-center justify-between" >
            <Link to={`/docs/${doc.id}`} className="text-lg font-medium hover:underline ">
                {doc.title}
            </Link>
            <p>{doc.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;
