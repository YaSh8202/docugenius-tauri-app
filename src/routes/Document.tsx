import DocChat from "@/components/DocChat";
import { Doc } from "@/types";
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import SplitPane from "react-split-pane-next";

// export const loader = async({params})=>{

// }

export default function DocPage() {
  const { doc } = useLoaderData() as {doc: Doc};
  const pdfRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!pdfRef.current) return;

    pdfRef.current.setAttribute("src", doc.url);
  }, [doc]);

  console.log(doc);

  return (
    <main className=" flex-1 h-[calc(100vh-68px)] overflow-hidden ">
      <SplitPane
        split="vertical"
        minSize={400}
        defaultSize={parseInt(
          window.localStorage.getItem("splitPos") || "400",
          10
        )}
        onChange={(size: any) => localStorage.setItem("splitPos", size.toString())}
      >
        <div className="overflow-hidden h-[calc(100vh-68px)] pr-2 ">
          <iframe
            id="pdf-js-viewer"
            src={doc.url}
            title="webviewer"
            ref={pdfRef}
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="100%"
            className="scrollbar-hide overflow-hidden"
          ></iframe>
        </div>
        <div className=" overflow-hidden h-[calc(100vh-68px)]">
          <DocChat doc={doc} />
          {/* <div className=" bg-green-100 h-full"></div> */}
        </div>
      </SplitPane>
    </main>
  );
}
