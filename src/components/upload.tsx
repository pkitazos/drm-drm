"use client";
 
import { UploadButton } from "~/lib/uploadthing";

const Upload = () => {
  return (
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {

          alert(`ERROR! ${error.message}`);
        }}
      />
  );
}

export default Upload