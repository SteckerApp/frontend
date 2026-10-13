import { Icons } from "@/constants";

interface FileDownloadProps {
    icon: string;
    fileName: string;
    bgColor?: string;
  }
  
  const FileDownload: React.FC<FileDownloadProps> = ({ icon, fileName, bgColor  }) => (
    <div className={`flex justify-start items-center ${bgColor} gap-2 p-2 rounded-md w-full lg:w-[12.5rem]`}>
      <img src={icon} />
      <section>
        <span className="text-black text-12 lg:text-15 font-normal font-outfit text-nowrap">{fileName?.slice(0, 12)}</span>
        <p className="flex justify-start items-center gap-2 text-10">
          <img src={Icons.DownloadCloudIcon} width={30} /> Download
        </p>
      </section>
    </div>
  );

  export default FileDownload
  