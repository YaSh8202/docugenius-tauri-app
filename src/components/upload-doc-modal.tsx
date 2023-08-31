import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";

import { PlusIcon } from "@radix-ui/react-icons";
import { CSSProperties, useMemo } from "react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  // backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export function UploadDocModal() {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "application/pdf": [".pdf"] } });

  const style = useMemo(
    () =>
      ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      } as CSSProperties),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="h-4 w-4 mr-1" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>
            You can upload a document by dragging and dropping it
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="my-2">
            <div {...getRootProps({ style })}>
              <input accept="image/*" {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
