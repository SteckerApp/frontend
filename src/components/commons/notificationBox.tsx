import { Images } from '@/constants';
import React from 'react'

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
    isFirst: boolean;
    isLast?: boolean;
  }

const NotificationBox:React.FC<MessageNotificationBox> = (props) => {
    const { isFirst, isLast } = props;
    const marginBottomClass = isLast ? '' : 'mb-8';
  return (
    <div  className={`${isFirst ? marginBottomClass : ''}`}>
        <p className={`flex justify-start items-start text-16 font-semibold font-outfit text-blackHeader`}>{props.day}</p>
            {props.message?.map((item, index) => (
                <section key={index} className={`flex justify-start items-start flex-col ${item?.isRead ? "" : "bg-dashboardBg"} rounded-10 ${item?.isRead ? "py-1" : "py-3"} px-4 mt-3`}>
                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center w-full'>
                        <div className='flex justify-start items-center gap-3 order-2 lg:order-1'>
                            {item?.isRead ? null : <img src={Images.UnreadIcon} width={12} height={12} />}
                            <p className='text-gray text-14 lg:text-16 font-outfit font-normal'>{item?.sender} <span className='font-semibold text-black'>{item?.message}</span></p>
                        </div>
                        <span className='text-gray text-14 font-normal font-outfit order-1 lg:order-2'>{item?.time}</span>
                    </div>
                    {item?.isReplied ? <p className={`${item?.isRead ? "bg-dashboardBg" : "bg-white"} text-14 lg:text-16 font-outfit font-normal rounded-10 p-2 ${item?.isRead ? "ml-0" : "ml-5" } mt-2`}>{item?.repliedMessage}</p> : null}
                   
            </section>
            ))}
    </div>
  )
}

export default NotificationBox
