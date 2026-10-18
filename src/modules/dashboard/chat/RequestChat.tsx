import { InnerWrapper } from "@/components";
import { ChatLeft } from "./modules/ChatLeft";
import { Icons } from "@/constants";
import { ChatRight } from "./modules/ChatRight";
import { useParams } from "react-router-dom";
import { useState } from "react";

const RequestChat = () => {
  const { id } = useParams();
  const [isCopyAction, setIsCopyAction] = useState<boolean>(true);

  const toggleCopyAction = () => {
    setIsCopyAction((prev) => !prev);
  };

  console.log(id);

  return (
    <>
      <InnerWrapper>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
          {/* left request chat */}
          <div className="bg-white w-full lg:w-[55rem] h-full lg:h-[50rem] rounded-20 p-5 lg:p-8 lg:order-1 order-2">
            <ChatLeft />
          </div>

          {/* right request chat */}
          <div className="bg-white rounded-20 p-5 lg:p-8 w-full lg:w-[30rem] h-full lg:h-[50rem] lg:order-2 order-1 mt-5 lg:mt-0">
            <section className="flex justify-between items-center text-gray text-16 font-normal font-outfit">
              <span>Copy / Description</span>
              <Icons.ChevronDownIcon
                onClick={toggleCopyAction}
                className="cursor-pointer"
              />
            </section>
            <ChatRight isCopyAction={isCopyAction} />
          </div>
        </div>
      </InnerWrapper>
    </>
  );
};

export default RequestChat;
