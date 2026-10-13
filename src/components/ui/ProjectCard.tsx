import { Icons, Images, paths } from "@/constants";
import { Avatar, Progress } from "antd";
import { useNavigate } from "react-router-dom";

interface ProjectsProps {
    id?: string;
    title?: string;
}

interface Projects {
  data: ProjectsProps[]
}

const ProjectCard:React.FC<Projects> = ({ data }) => {
  const navigate = useNavigate(); 

  return (
    <>
      {data?.map((item) => (
        <div key={item?.id} className="h-[178px] bg-white rounded-20 p-5 cursor-pointer" onClick={() => navigate(`${paths.dashboardRequestChat}${item?.id ?? ""}`)}>
          <div className="flex justify-between items-center">
            <section className="flex justify-start items-start flex-col">
              <span className="text-16 text-black font-medium font-outfit">
               {item?.title ?? "Ebook design"}
              </span>
              <span className="text-11 font-normal font-outfit text-black">
                Created 20th July, 2020 at 1:33pm
              </span>
            </section>
            <button className="bg-dashboardBg font-medium font-outfit text-11 text-primary px-4 py-1 rounded-md">
              To Do
            </button>
          </div>

          <div className="flex justify-start items-center bg-dashboardBg gap-2 px-2 my-4 w-16 text-15 text-black font-medium font-outfit rounded-md cursor-pointer">
              <Icons.AttachIcon size={30} color={`var(--colorBlack)`} /> <span className="w-16">11</span>
          </div>

          {/* progress and users */}
          <div className="flex justify-between items-center gap-10">
            <Progress
              percent={60}
              percentPosition={{ align: "start", type: "outer" }}
              strokeColor={`var(--colorPrimary)`}
            />
            <Avatar.Group
              shape="circle"
              max={{
                count: 3,
                style: { color: `var(--colorPrimary)`, backgroundColor: `var(--colorPrimaryLight)` },
                popover: {content: null}
              }}
            >
                <Avatar src={Images.UserAvatar} size={33} />
                <Avatar src={Images.UserAvatar} size={33} />
                <Avatar src={Images.UserAvatar} size={33} />
                <Avatar src={Images.UserAvatar} size={33} />
            </Avatar.Group >
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectCard;
