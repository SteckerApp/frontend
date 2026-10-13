import { Icons } from '@/constants';
import { Avatar } from 'antd';
import React, { useState } from 'react';

interface UploadedFile {
  name: string;
  type: string;
  size: number;
  progress: number;
  status: 'uploading' | 'uploaded' | 'error';
  preview: string | null;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const supportedFormats = ['jpeg', 'png', 'gif', 'mp4', 'pdf', 'psd', 'ai', 'doc', 'ppt'];
  const imageFormats = ['jpeg', 'png', 'gif'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles: UploadedFile[] = selectedFiles?.map(file => {
      const fileType = file.name.split('.').pop()?.toLowerCase() || '';
      const isSupported = supportedFormats.includes(fileType);
      const isImage = imageFormats?.includes(fileType);

      return {
        name: file.name,
        type: fileType,
        size: file.size,
        progress: isSupported ? 100 : 0,
        status: isSupported ? 'uploaded' : 'error',
        preview: isImage ? URL.createObjectURL(file) : null,
      };
    });

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDelete = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  return (
    <div className="py-5 mt-5 max-w-full h-full lg:h-[40rem] overflow-y-auto">
      {/* Drag and Drop Area */}
      <div className="border-2 border-dashed border-gray p-8 rounded-lg text-center bg-primaryLight cursor-pointer">
        <input
          type="file"
          multiple
          className="hidden"
          id="fileInput"
          onChange={handleFileUpload}
        />
        <label htmlFor="fileInput" className="flex justify-center items-center flex-col cursor-pointer">
            <img src={Icons.UploadIcon} />
          <p className="text-black font-bold font-outfit text-20 mb-2">Drag & drop files or <span className="text-primary underline">Browse</span></p>
          <p className="text-gray text-13 font-normal font-outfit">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, DOC, PPT</p>
        </label>
      </div>

      {/* File List */}
      <div className="mt-4">
        <p className="text-gray font-normal font-outfit mb-2">Uploaded - {files.length}/{files?.length} files</p>

        {files.map((file, index) => (
          <div
            key={index}
            className={`flex items-center justify-between mb-2 p-2 border ${
              file.status === 'error' ? 'border-error bg-white' : 'border-success bg-green-50'
            } rounded-lg`}
          >
            <div className="flex items-center space-x-3">
              {/* File Preview or Icon */}
              {file.preview ? (
                <Avatar src={file.preview} size={32} shape='square' className="w-8 h-8"/>
              ) : (
                <Avatar size={32} shape='square' className="w-8 h-8"/>
              )}
              <div>
                <p className="text-12 text-black font-normal font-outfit">{file.name}</p>
                {file.status === 'error' && (
                  <p className="text-error text-xs">This document is not supported, please delete and upload another file.</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {file.status !== 'error' && (
                <div className="w-32 bg-gray rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      file.status === 'uploaded' ? 'bg-primary' : 'bg-error'
                    }`}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              )}
              <button type="button" onClick={() => handleDelete(file.name)} className="cursor-pointer text-error hover:text-error text-14 font-medium font-outfit">
                <img src={Icons.FileDeleteIcon} width={20} height={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FileUpload };
