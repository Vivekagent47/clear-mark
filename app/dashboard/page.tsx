"use client";

import { Card } from "@/components/ui/card";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-drop";
import { cn } from "@/lib/utils";
import { Download, Laptop } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";

const PlagiarismChecker = () => {
  const [files, setFiles] = useState<File[] | null>([]);

  const dropzone = {
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024, // 1MB
  } satisfies DropzoneOptions;

  return (
    <div className="min-h-screen bg-[#0D1117] p-6 text-white">
      <Card className={cn("space-y-4 rounded-lg border-0 bg-[#161B22]")}>
        <FileUploader
          value={files}
          onValueChange={setFiles}
          dropzoneOptions={dropzone}
          className="relative h-full space-y-1"
        >
          {(!files || !files.length) && (
            <FileInput className="border border-dashed border-gray-500">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Download className="h-8 w-8 text-purple-400" />
                <p className="text-center text-purple-400">
                  Drag pdf, doc, docx, files here or browse
                </p>
              </div>

              <div className="text-center text-gray-400">or</div>

              <div className="flex justify-center space-x-8">
                <button className="flex flex-col items-center space-y-2 text-purple-400 hover:text-purple-300">
                  <Laptop className="h-6 w-6" />
                  <span className="text-sm">My Device</span>
                </button>
              </div>
            </FileInput>
          )}

          <FileUploaderContent className="h-full">
            {files?.map((file, i) => (
              <FileUploaderItem
                key={i}
                index={i}
                className="size-20 overflow-hidden rounded-md p-0"
                aria-roledescription={`file ${i + 1} containing ${file.name}`}
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  height={80}
                  width={80}
                  className="size-20 p-0"
                />
              </FileUploaderItem>
            ))}
          </FileUploaderContent>
        </FileUploader>
      </Card>
    </div>
  );
};

export default PlagiarismChecker;
