import { Images } from "@/constants";
import { Avatar } from "antd";

const ReferralTable = () => {
    const orderHistory = [
      {
        id: 1,
        date: "2024-10-03",
        amount: "N22,345",
        user: "godwin",
      },
      {
        id: 2,
        date: "2024-09-03",
        amount: "N22,345",
        user: "Walex D Great",
      },
      {
        id: 3,
        date: "2024-09-03",
        amount: "N22,345",
        user: "Walex D Great",
      },
      {
        id: 4,
        date: "2024-09-03",
        amount: "N22,345",
        user: "Walex D Great",
      },
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse mt-5">
          <thead className="text-black text-15 font-medium font-outfit">
            <tr>
              <th className="py-3 w-[200px]">Users</th>
              <th className="py-3 w-[200px]">Referral Earn</th>
              <th className="py-3 w-full lg:w-[5rem]">Date</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory?.map((order) => (
              <tr
                key={order.id}
                className="text-16 font-normal font-outfit gap-5 text-nowrap border-b border-primaryLight first:border-t"
              >
                <td className="py-3 pr-5 w-[200px] text-nowrap gap-3"> <Avatar src={Images.UserAvatar} size={40} shape="circle" /> {order.user}</td>
                <td className="py-3 pr-5 w-[200px]">{order.amount}</td>
                <td className="py-3 w-full lg:w-[5rem]">{order?.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export { ReferralTable };
  