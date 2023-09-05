import DocChat from "@/components/DocChat";
import { Resizable } from 'react-resizable';



export default function DocPage() {
  return (
    <main className="grid grid-cols-4 flex-1 h-[calc(100vh-68px)] overflow-hidden ">
      <div className="col-span-2   bg-gray-700 overflow-hidden ">
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
