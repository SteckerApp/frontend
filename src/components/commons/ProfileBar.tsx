import { spark } from "@/config";
import { Icons } from "@/constants";
import { UserProfileResponse } from "@/types/types";
import { Avatar, Button, Skeleton, Switch } from "antd";
import React from "react";


const ProfileBar = ({  setIsAddAccountOpen, profile, isProfileLoading } : {  setIsAddAccountOpen: React.Dispatch<React.SetStateAction<boolean>>, profile: UserProfileResponse | undefined, isProfileLoading: boolean }) => {

  const toggleOpenAccount = () => {
    setIsAddAccountOpen((prev: boolean) => !prev);
  };
  
  return (
    <div>
      <section className="flex justify-start items-start flex-col bg-sidebarLog bg-cover bg-center bg-no-repeat p-5 rounded-20">
        <span className="text-13 text-white font-normal font-outfit">
          Current workspace
        </span>
        <span className="text-white text-22 font-semibold font-outfit">
          Spark Creative Studio’s Workspace
        </span>

        <span className="text-13 text-white font-normal font-outfit mt-10">
          Created By
        </span>
        <div className="flex justify-start items-center gap-3 pt-2">
          <Avatar shape="circle" size={40} />
          <span className="text-14 text-white font-medium font-outfit">
            Amusat Olawale
          </span>
        </div>
      </section>

      {/* other workspace */}
      <div className="pt-10 relative">
        <span className="text-black text-15 font-medium font-outfit">
          Other Workspaces
        </span>

        <div className="overflow-y-auto">
        {Array.from({ length: 2 })?.map((_, index) => (
          <div
            className="flex justify-between items-center h-16 mt-2 bg-dashboardBg px-5 py-4 rounded-20 cursor-pointer hover:border hover:border-primary hover:bg-white"
            key={index}
          >
            <div className="flex justify-center items-center gap-3">
              <Avatar shape="circle" size={35} />
              <div className="flex justify-start items-start flex-col">
                <span className="text-12 text-black font-medium font-outfit leading-[12px]">
                  Space Industry
                </span>
                <span className="text-10 text-black font-normal font-outfit">
                  {index + 1} members
                </span>
              </div>
            </div>
            <Icons.ArrowRight size={15} />
          </div>
        ))}
        </div>

        <Button className="w-full mt-5 hover:bg-pending" type="primary" onClick={toggleOpenAccount}>
          Add Account
        </Button>
      </div>

      <section className="absolute bottom-5 right-5 left-5">
        <div className="flex justify-between items-center border-b-2 border-b-dashboardBg pb-5 mb-5">
          <Switch
            title="Notify"
            checkedChildren={<Icons.CheckOutlined />}
            unCheckedChildren={<Icons.CloseOutlined />}
            defaultChecked
          />
          <span className="text-black text-13 font-normal font-outfit">
            Notify on updates and activities
          </span>
        </div>

        <div className="flex justify-start items-center gap-3">
            <Avatar className="border-2 border-border" shape="circle" size={60} src={isProfileLoading ? <Skeleton.Avatar shape='circle' size={40} /> : spark.apiBaseUrl + profile?.data?.user?.avatar} />
            <section className="flex justify-start items-start flex-col">
                <span className="text-20 text-black font-medium font-outfit">{profile?.data?.user?.firstName} {profile?.data?.user?.lastName?.length === 7 ? profile?.data?.user?.lastName : profile?.data?.user?.lastName?.slice(0, 7) + "..." }</span>
                <button className="bg-pending hover:bg-primary py-2 px-5 rounded-10 text-black hover:text-white text-13 font-normal font-outfit">View Profile</button>
            </section>
        </div>
      </section>
    </div>
  );
};

export default ProfileBar;
