import { Avatar } from "antd";

interface UserInfoProps {
    avatar: string;
    name: string;
    role?: string;
    roleColor?: string;
    flex?: string
  }
  
  const UserChatInfo: React.FC<UserInfoProps> = ({ avatar, name, role, roleColor, flex }) => (
    <div className={`flex ${flex} items-center gap-3 mb-2`}>
      <Avatar size={33} src={avatar} />
      <span className="text-15 text-black font-medium font-outfit">{name}</span>
      {role && (
        <span className={`py-2 px-3 rounded-10 font-medium font-outfit text-10 ${roleColor}`}>
          {role}
        </span>
      )}
    </div>
  );

  export default UserChatInfo
  