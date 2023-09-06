import api from "@/lib/api";
import { Doc } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const DocumentsPage = () => {

  const { data } = useQuery(["docs"], async () => {
    const res = await api.get("/docs");
    return res.data.status === "success" ? (res.data.data.docs as Doc[]) : null;
  });


  return (
    <div className="w-full py-6 ">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Documents</h1>
        <ul className="flex flex-col gap-4 mt-2 ">
          {data?.map((doc: Doc) => (
            <div
              key={doc.id}
              className="flex flex-row items-center justify-between"
            >
              <Link
                to={`/docs/${doc.id}`}
                className="text-lg font-medium hover:underline "
              >
                {doc.title}
              </Link>
              <p>{doc.url}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentsPage;
