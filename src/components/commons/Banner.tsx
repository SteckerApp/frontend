import { Images } from "@/constants";
import { Avatar, Skeleton } from "antd";

const Banner = ({
  setIsAddTeamOpen,
  title = "Sparkle Workspace",
  description = "Welcome to your workspace",
  loading = false,
  avatar = Images.UserAvatar,
}: {
  setIsAddTeamOpen: React.Dispatch<React.SetStateAction<boolean>>,
  title?: string
  description?: string
  loading?: boolean
  avatar?: string
}) => {
  const toggleOpenAccount = () => {
    setIsAddTeamOpen((prev: boolean) => !prev);
  };

  return (
    <div className="block md:flex justify-between items-center bg-primary rounded-20 py-8 px-5 lg:px-10 text-center lg:text-left space-y-2 md:space-y-0">
      <div className="block md:flex justify-center items-center gap-3 text-center md:text-left">
      {loading ? <Skeleton.Avatar size={100} /> : <Avatar
          size={100}
          src={avatar}
          className="border-2 border-white"
        />}

        <section className="flex justify-center md:justify-start items-center md:items-start flex-col ">
          <span className="text-25 lg:text-30 text-white font-medium font-outfit">
            {loading ? <Skeleton.Button /> : title}
          </span>
          <span className="text-18 md:text-20 capitalize text-white font-normal font-outfit">
            {loading ? <Skeleton.Button /> : description}
          </span>
        </section>
      </div>
      <div className="flex justify-center items-center">
      <button
        onClick={toggleOpenAccount}
        className="capitalize border border-primary px-4 p-2 rounded-10 font-outfit text-20 font-normal bg-white text-black"
      >
        Invite team member
      </button>
      </div>
    </div>
  );
};

export default Banner;
