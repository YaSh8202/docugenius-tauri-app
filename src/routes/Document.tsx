// import { useState } from "react";
// import { Document, Page } from "react-pdf";
// const pdfjs = require('pdfjs-dist');

import DocChat from "@/components/DocChat";

export default function DocPage() {
  //   const [numPages, setNumPages] = useState<number>();
  //   const [pageNumber, setPageNumber] = useState<number>(18);

  //   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //     setNumPages(numPages);
  //   }

  return (
    <main className="grid grid-cols-4 flex-1 h-[calc(100vh-68px)] overflow-hidden ">
      <div className="col-span-2   bg-gray-700 overflow-hidden ">
        {/* <Document
          file="https://res.cloudinary.com/dpuscktmu/image/upload/v1693843614/desdzsgox3uo4bhjifbi.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page  width={300}  pageNumber={pageNumber} />
          <Page  width={300}  pageNumber={pageNumber+1} />
          <Page  width={300}  pageNumber={pageNumber+2} />
        </Document>
        <p>
          Page  {pageNumber} of {numPages}
        </p> */}
        <iframe
          id="pdf-js-viewer"
          src="https://res.cloudinary.com/dpuscktmu/image/upload/v1693843614/desdzsgox3uo4bhjifbi.pdf"
          title="webviewer"
          frameBorder="0"
          scrolling="no"
          width="100%"
          height="100%"
          className="scrollbar-hide overflow-hidden"
        ></iframe>
      </div>
      <div className="col-span-2 max-h-full overflow-hidden">
        <DocChat />
      </div>
    </main>
  );
}
