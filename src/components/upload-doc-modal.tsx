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
import { CSSProperties, useMemo, useState } from "react";
import { uploadToCloudinary } from "@/lib/utils";
import { Icons } from "./icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10000000, // 10MB
  });
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

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

  const submitHandler = async () => {
    const file = acceptedFiles[0];

    setIsLoading(true);
    const url = await uploadToCloudinary(file);
    setUploadedFile(url);
    setIsLoading(false);
  };

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
          <DialogTitle>Create a new Doc</DialogTitle>
          <DialogDescription>
            Upload a PDF file to create a new Doc in your workspace
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
        <div className="grid gap-1">
            <Label className="sr-only" htmlFor="title">
              Doc Title
            </Label>
            <Input
              id="title"
              placeholder="Doc Title"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-2">
            <div
              className="h-32 grid place-content-center"
              {...getRootProps({ style })}
            >
              <input accept="image/*" {...getInputProps()} />
              {!acceptedFiles.length ? (
                <>
                  <p>Drag 'n' drop a doc here, or click to select a doc</p>
                  <p>Max file size limit is 10MB</p>
                </>
              ) : (
                <p>
                  {acceptedFiles[0].name} - {(acceptedFiles[0].size/1000000).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submitHandler} type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <p>Upload</p>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
