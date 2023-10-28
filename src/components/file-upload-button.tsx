"use client";

import { PenIcon } from "lucide-react";
import toast from "react-hot-toast";
import { UploadButton } from "~/lib/uploadthing";
import { cn } from "~/lib/utils";

export function FileUploadButton() {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        res?.map((e) => e.url);
        console.log("Files: ", res);
        toast.success("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
      content={{
        button({ isUploading }) {
          return (
            <PenIcon
              className={cn(
                "h-4 w-4 cursor-pointer stroke-slate-500",
                isUploading && "stroke-slate-400",
              )}
            />
          );
        },
        allowedContent() {
          return <></>;
        },
      }}
    />
  );
}
