import { Icons, Images } from "@/constants";
import { Avatar } from "antd";
import React from "react";
import Button from "./Button";
import { apiServices } from "@/services";

interface DashboardCardProps {
  isProfile?: boolean;
  isTask?: boolean;
  isWorkspace?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = (props) => {
  const { data: getDashboardHome } = apiServices.useGetDashboardQuery();

  console.log("all dashboard home actions:", getDashboardHome)

  return (
    <div className="bg-white p-5 h-[149px] w-[300px] lg:w-full rounded-20 flex justify-between items-center">
      {props.isProfile && (
        <div className="flex justify-between items-center w-[300px] lg:w-full">
          <section className="flex justify-start items-start flex-col">
            <span className="text-primary text-20 font-medium font-outfit leading-normal">
              Godwin C. Ahua
            </span>
            <span className="text-13 font-medium font-outfit text-gray">
              Your account manager
            </span>

            <main className="flex justify-start items-start gap-3 pt-6">
              <article className="flex justify-center items-center bg-dashboardBg w-10 h-10 rounded-full cursor-pointer">
                <Icons.CallIcon size={20} />
              </article>
              <article className="flex justify-center items-center bg-dashboardBg w-10 h-10 rounded-full cursor-pointer">
                <Icons.EmailIcon size={20} />
              </article>
              <article className="flex justify-center items-center bg-dashboardBg w-10 h-10 rounded-full cursor-pointer">
                <Icons.WhatsAppIcon size={20} />
              </article>
            </main>
          </section>

          <Avatar shape="circle" size={80} src={Images.UserAvatar} />
        </div>
      )}

      {props.isTask && (
        <div className="flex justify-between items-center text-center w-[300px] lg:w-full">
          <section className="flex justify-center items-center flex-col">
            <span className="text-gray text-13 font-medium font-outfit leading-normal">
              To Do
            </span>
            <span className="text-25 font-medium font-outfit text-primary pt-3">
              50
            </span>
          </section>
          <section className="flex justify-center items-center flex-col">
            <span className="text-gray text-13 font-medium font-outfit leading-normal">
              Ongoing
            </span>
            <span className="text-25 font-medium font-outfit text-primary pt-3">
              05
            </span>
          </section>
          <section className="flex justify-center items-center flex-col">
            <span className="text-gray text-13 font-medium font-outfit leading-normal">
              Completed
            </span>
            <span className="text-25 font-medium font-outfit text-primary pt-3">
              90
            </span>
          </section>
        </div>
      )}

      {props.isWorkspace && (
        <div className="w-[300px] lg:w-full">
          <section className="flex justify-start items-start flex-col">
            <span className="text-primary text-20 font-medium font-outfit leading-normal">
              Spark Creative Workspace
            </span>
            <span className="text-13 font-medium font-outfit text-gray">
              View all your team members
            </span>
          </section>

          <section className="flex justify-between items-center gap-3 pt-5">
            <Avatar.Group
              shape="circle"
              size={40}
              max={{
                count: 4,
                style: {
                  color: `var(--colorPrimary)`,
                  backgroundColor: `var(--colorPrimaryLight)`,
                },
                popover: { content: null },
              }}
            >
              <Avatar shape="circle" size={40} src={Images.UserAvatar} />
              <Avatar shape="circle" size={40} src={Images.UserAvatar} />
              <Avatar shape="circle" size={40} src={Images.UserAvatar} />
              <Avatar shape="circle" size={40} src={Images.UserAvatar} />
              <Avatar shape="circle" size={40} src={Images.UserAvatar} />
            </Avatar.Group>
            <Button type="button" bg="bg-primary" color="text-white">View All</Button>
          </section>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
