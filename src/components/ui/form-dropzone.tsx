"use client";

import Image from "next/image";
import * as React from "react";

import toast from "react-hot-toast";
import { UploadDropzone } from "~/lib/uploadthing";
import { cn } from "~/lib/utils";

export function FormDropzone({
  submit,
  value,
  className,
}: {
  submit: (url: string) => void;
  value?: string;
  className: string;
}) {
  return (
    <UploadDropzone
      className={cn("cursor-pointer", className)}
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
        label: ({ ready }) => !ready && <p>item photo</p>,
        uploadIcon: ({ ready }) => !ready && <></>,
        allowedContent: () => (
          <>
            {value && (
              <Image
                className="h-56 w-56 object-contain object-center"
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
