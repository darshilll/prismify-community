/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/svg': ['.svg'],
      'image/heic': ['.heic'],
      'image/gif': ['.gif'],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex flex-col gap-2 flex-center">
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
          className="h-16 w-16 xs:h-24 xs:w-24 rounded-full object-cover object-top"
        />
        <p className="text-[#8f8a89] small-regular md:base-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;