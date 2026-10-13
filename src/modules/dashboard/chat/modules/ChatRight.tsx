import { AddCollaborator, CustomModal } from "@/components";
import { Icons, Images } from "@/constants";
import { Avatar } from "antd"
import { useState } from "react";


const ChatRight = ({ isCopyAction } : { isCopyAction: boolean}) => {
  const [ addCollaboratorOpen, setAddCollaboratorOpen ] = useState<boolean>(false);
  const [isActionsOpen, setIsActionsOpen] = useState<boolean>(true);
  const [ isAttachmentsOpen, setIsAttachmentsOpen] = useState<boolean>(true);
  const [ isCollaboratorOpen, setIsCollaboratorOpen] = useState<boolean>(true);

  const toggleAddCollaborator = () => {
    setAddCollaboratorOpen((prev) =>!prev);
  }

  const handleClose = () => {
    setAddCollaboratorOpen(false);
  }

  const toggleActions = () => {
    setIsActionsOpen((prev) => !prev);
  }

  const toggleAttachments = () => {
    setIsAttachmentsOpen((prev) => !prev);
  }
  const toggleCollaborator = () => {
    setIsCollaboratorOpen((prev) => !prev)
  }

  return (
    <>
      <div className="pt-2">
       {isCopyAction && (
        <>
             <span className="text-gray500 text-15 font-normal font-outfit">
          Visual elements: With the site architecture and some content in place,
          we can start working on the visual brand. Depending on the client, this
          may already be well-defined, but you might
        </span>

            <div className="grid grid-cols-2 gap-3 mt-5">
                  <section className="border border-gray rounded-md py-4 px-6">
                      <p className="text-15 text-black font-normal font-outfit pb-2">Brand</p>
                      <p className="flex justify-start items-center text-17 font-normal font-outfit gap-3"><Icons.FolderIcon size={30} color={`var(--colorGray)`} /> <span className="text-primary">Spark</span></p>
                  </section>

                  <section className="border border-gray rounded-md py-4 px-6">
                      <p className="text-15 text-black font-normal font-outfit pb-2">Deliverables</p>
                      <div className="flex justify-start items-center gap-2">
                          {Array.from({length: 3})?.map((_, i) => (
                              <p className="w-8 h-8" key={i}><img src={Icons.PDFImg} width="100%" height="100%" /></p>
                          ))}
                      </div>
                  </section>
            </div>

        {/* dimensions */}
          <div className="flex justify-start items-start flex-col my-5">
            <p className="text-gray text-15 font-normal font-outfit">Dimension: <span className="text-black">1228 x 200px, 220 x 200px</span></p>
            <p className="text-gray text-15 font-normal font-outfit">Reference link: <span className="text-primary">www.jsjd....com, www.jhjd...co</span></p>
            <p className="flex justify-start items-center text-gray text-15 font-normal font-outfit mt-2">Colors: <span className="text-white bg-primary py-1 px-2 rounded-md ml-4 mr-2">#FFF000</span> <span className="text-white bg-error py-1 px-2 rounded-md">#FFF000</span></p>
          </div>
        </>
       )}

{/* actions */}
      <div className="mb-5">
            <section className="flex justify-between items-center text-gray text-16 font-normal font-outfit">
              <span>Actions</span>
              <Icons.ChevronDownIcon onClick={toggleActions} className="cursor-pointer" />
            </section>

            {isActionsOpen && (
            <section className="flex justify-center items-center gap-3 mt-2">
              <button className="flex justify-center items-center gap-2 text-nowrap bg-primary py-4 text-12 lg:text-15 font-normal font-outfit px-2 rounded-lg text-white w-full">
                <Icons.CheckListIcon /> Mark as Complete
              </button>
              <button className="flex justify-center items-center gap-2 bg-primaryLight text-12 lg:text-15 font-normal font-outfit py-4 px-2 rounded-lg text-black w-full">
                <Icons.FolderIcon /> Duplicate board
              </button>
            </section>
          )}
      </div>

        {/* collaborator */}
            <section className="flex justify-between items-center text-gray text-16 font-normal font-outfit mb-3">
              <span>Collaborator</span>
              <Icons.ChevronDownIcon onClick={toggleCollaborator} className="cursor-pointer" />
            </section>

          {isCollaboratorOpen && (
             <div className="flex justify-start items-center gap-5">
             <Avatar.Group
             shape="circle"
             size={40}
             max={{
                 count: 2,
                 style: {
                 color: `var(--colorPrimary)`,
                 backgroundColor: `#F2F4F7`,
                 },
                 popover: { content: null },
             }}
             >
                 <Avatar shape="circle" className="border-2 border-white border-inside" size={40} src={Images.UserAvatar} />
                 <Avatar shape="circle" className="border-2 border-white border-inside" size={40} src={Images.UserAvatar} />
                 <Avatar shape="circle" className="border-2 border-white border-inside" size={40} src={Images.UserAvatar} />
                 <Avatar shape="circle" className="border-2 border-white border-inside" size={40} src={Images.UserAvatar} />
             </Avatar.Group>

             <button onClick={() => toggleAddCollaborator()} className="flex justify-center items-center text-black w-10 h-10 rounded-full bg-primaryLight cursor-pointer">+</button>
        </div>
          )}

    {/* attachment */}
        <div>
            <section className="flex justify-between items-center text-gray text-16 font-normal font-outfit my-3">
                    <span className="flex justify-center items-center gap-1">Attachment  <Icons.AttachIcon /> 8</span>
                    <Icons.ChevronDownIcon onClick={toggleAttachments} className="cursor-pointer" />
            </section>

            {isAttachmentsOpen && (
                <>
                      {Array.from({length: 2})?.map((_, i) => (
              <div className="flex justify-start items-center gap-3 mt-2" key={i}>
              <Avatar src={Images.UserAvatar} size={60} shape="square" className="rounded-md" />
              <section>
                  <span className="text-15 lg:text-18 text-black font-semibold font-outfit">Desktop design.png</span>
                  <p className="text-gray text-12 lg:text-15 font-normal font-outfit">12-05-2022 at 08:28pm  <span className="font-bold text-primary">Download</span> </p>
              </section>
          </div>
            ))}

            <div className="flex justify-center items-center gap-2 mt-4">
              <p aria-description="inactive" className="w-2 h-2 border border-primary bg-white rounded-full cursor-pointer"></p>
              <p aria-description="active" className="w-2 h-2 border border-primary bg-primary rounded-full cursor-pointer"></p>
            </div>
                </>
            )}
        </div>
    </div>

    {addCollaboratorOpen && (
      <CustomModal width={400} open={addCollaboratorOpen} onCancel={handleClose}>
        <AddCollaborator />
      </CustomModal>
    )}
    </>
  );
};


export { ChatRight };
