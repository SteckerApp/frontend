import { DashboardLayout, InnerWrapper, Label, NotificationBox } from "@/components";
import { Icons } from "@/constants";

interface MessageProps {
  sender: string;
  message: string;
  time: string;
  isRead: boolean;
  isReplied?: boolean;
  repliedMessage?: string;
}

interface MessageNotificationBox {
  day: string;
  message: MessageProps[];
}
const Notify = () => {
  const messages: MessageNotificationBox[] = [
    {
      day: "Today",
      message: [
        {
          sender: "Leonardi Bernado",
          message: "Donut Campaign Flyer moved to Ongoing",
          time: "10.12 PM",
          isRead: false,
          isReplied: false,
        },
        {
          sender: "Michaela",
          message:
            "Hello @michael, can we change the color of the bg to blue? thanks",
          time: "10.10 PM",
          isReplied: true,
          repliedMessage: "Of course, we'll do that. Thanks!",
          isRead: false,
        },

        {
          sender: "Omiwale Bernado",
          message:
            "moved Creating Design System for Easier and Faster Design to Done",
          time: "10.10 PM",
          isReplied: false,
          isRead: true,
        },
        {
            sender: "Leonardi Bernado",
            message: "Donut Campaign Flyer moved to Ongoing",
            time: "10.12 PM",
            isRead: false,
            isReplied: false,
          },
          {
            sender: "Michaela",
            message:
              "Hello @michael, can we change the color of the bg to blue? thanks",
            time: "10.10 PM",
            isReplied: true,
            repliedMessage: "Of course, we'll do that. Thanks!",
            isRead: false,
          },
  
          {
            sender: "Omiwale Bernado",
            message:
              "moved Creating Design System for Easier and Faster Design to Done",
            time: "10.10 PM",
            isReplied: false,
            isRead: true,
          },
      ],
    },

    {
      day: "Yesterday",
      message: [
        {
          sender: "Leonardi Bernado",
          message: "Donut Campaign Flyer moved to Ongoing",
          time: "10.12 PM",
          isRead: true,
          isReplied: false,
        },
        {
          sender: "Michaela",
          message:
            "Hello @michael, can we change the color of the bg to blue? thanks",
          time: "10.10 PM",
          isReplied: true,
          repliedMessage: "Of course, we'll do that. Thanks!",
          isRead: true,
        },

        {
          sender: "Omiwale Bernado",
          message:
            "moved Creating Design System for Easier and Faster Design to Done",
          time: "10.10 PM",
          isReplied: false,
          isRead: true,
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <InnerWrapper>
        <div className="flex justify-between items-center pb-5">
        <Label label="Notification" />
        <span className="flex justify-center items-center gap-3"> 
            <Icons.FilterIcon className="text-gray cursor-pointer" />
            <Icons.Dot3con className="text-gray cursor-pointer"  />
        </span>
        
        </div>
        <div className="bg-white rounded-20 p-5 lg:p-10">
            <div className="h-[40rem] lg:h-[40rem] overflow-y-auto">
            {messages?.map((item, index) => (
            <NotificationBox
              key={index}
              day={item.day}
              message={item.message}
              isFirst={index === 0}
              isLast={index === messages?.length - 1}
            />
          ))}
            </div>
        </div>
      </InnerWrapper>
    </DashboardLayout>
  );
};

export default Notify;
