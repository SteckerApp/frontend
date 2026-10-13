import { FileDownload, SendMessageInput, UserChatInfo } from "@/components";
import { Icons, Images, paths } from "@/constants";
import { Image } from "antd";
import { Link } from "react-router-dom";

const ChatLeft = () => {


  return (
    <div>

        {/* caption header */}
      <div className="flex justify-start items-start gap-2 lg:gap-5">
        <Link to={paths.dashboardRequest}>
        <p className="flex justify-center items-center bg-primary p-2 lg:p-3 text-white rounded-md w-5 lg:w-10 rotate-180">
          <Icons.ChevronRightIcon />
        </p></Link>
        <section className="flex justify-start items-start flex-col w-full">
          <span className="text-15 lg:text-22 text-black font-medium font-outfit">
            Pitch desk design for the year
          </span>
          <section className="block lg:flex justify-between items-start lg:items-center text-12 lg:text-15 text-black font-normal font-outfit w-full">
            <p className="flex justify-start items-start">
              Submitted on:
              <span className="font-semibold pl-1">30th of July, 2022 9:45am</span>
            </p>
            <div className="flex justify-start lg:justify-center items-center gap-3 mt-2 lg:mt-0">
              <p className="text-gray text-12 lg:text-15 font-normal font-outfit">Status</p> 
              <section className="flex justify-center items-center gap-1 bg-primaryLight py-1 px-2 lg:p-2 rounded-10 text-12 lg:text-15 font-output font-normal text-black"> <p className="h-2 lg:h-4 w-2 lg:w-4 rounded-full bg-primary" /> ongoing</section>
            </div>
          </section>
        </section>
      </div>

      <div className="overflow-y-auto h-full lg:h-[39rem]">
            {/* designer */}
        <div className="mt-5">
            <UserChatInfo flex="justify-start" avatar={Images.UserAvatar} name="Tommy  Shelby" role="Designer" roleColor="bg-designerLight" />

           <section className="flex justify-start items-center gap-3 mt-2">
           {Array.from({length: 3})?.map((_, index) => (
                <div className="w-full md:w-[6rem] h-[4rem]" key={index}>
                <Image src={Images.UserAvatar} width="100%" height="100%" className="rounded-md" />
                <span className="text-9 lg:text-10 font-normal font-outfit text-gray500">11/12/2020.  8:00 PM</span>
              </div>
            ))}
           </section>
        </div>

        {/* author chat start */}
        <div className="mt-12">
            <UserChatInfo flex="justify-start" avatar={Images.UserAvatar} name="Mary Jane" role="Author" roleColor="bg-authorLight text-author" />
            <p className="text-black text-15 font-normal font-outfit pt-1 leading-small"> <span className="font-semibold bg-primaryLight p-[2px] rounded-md mr-1">@Omiwale Rasheed </span> has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the </p>
            <p className="flex justify-start items-center text-gray text-10 font-normal font-outfit gap-5 pt-2"> <span>11/12/2020.  8:00 PM</span> <span className="text-primary capitalize cursor-pointer">replay</span></p>
        </div>

        {/* author chat reply */}
        <div className="mt-5">
            <UserChatInfo flex="justify-end" avatar={Images.UserAvatar} name="Mary Jane"/>
            <p className="text-black text-15 font-normal font-outfit pt-1 leading-small"> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard . Lorem Ipsum has been the industry's standard  </p>
            <p className="flex justify-end items-center text-gray text-10 font-normal font-outfit gap-5 pt-2"> <span>11/12/2020.  8:00 PM</span> <span className="text-primary capitalize cursor-pointer">replay</span></p>
        </div>

        <div className="mt-5">
            <UserChatInfo flex="justify-end" avatar={Images.UserAvatar} name="Godwin Chidi Ahua"/>

            <div className="flex justify-end items-center gap-3">

                <FileDownload icon={Icons.PSDChat} fileName="Shelby banner.psd" bgColor="bg-primaryLight" />
                <FileDownload icon={Icons.PDFChat} fileName="Shelby banner.psd" bgColor="bg-designerLight" />
            </div>

            <p className="flex justify-end items-center text-gray text-10 font-normal font-outfit gap-5 pt-2"> <span>11/12/2020.  8:00 PM</span> <span className="text-primary capitalize cursor-pointer">replay</span></p>
        </div>
      </div>

        {/* send input */}
       <SendMessageInput />

    </div>
  );
};

export { ChatLeft };
