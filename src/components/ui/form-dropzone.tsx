"use client";

import Image from "next/image";
import * as React from "react";

import toast from "react-hot-toast";
import { UploadDropzone } from "~/lib/uploadthing";

export function FormDropzone({
  submit,
  value,
}: {
  submit: (url: string) => void;
  value?: string;
}) {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onUploadBegin={() => {
        toast.loading("Starting picture upload", { id: "PictureMainUpload" });
      }}
      onUploadError={() => {
        toast.error("Picture upload failed!", { id: "PictureMainUpload" });
      }}
      onClientUploadComplete={(urls) => {
        toast.success("Picture upload complete!", { id: "PictureMainUpload" });

        urls ??= [];

        console.log(urls);

        urls[0] && submit(urls[0].url);
      }}
      content={{
        allowedContent: () => (
          <>
            {value && (
              <Image
                src={value}
                alt="uploaded picture"
                width={100}
                height={100}
              />
            )}
          </>
        ),
      }}
    />
  );
}
