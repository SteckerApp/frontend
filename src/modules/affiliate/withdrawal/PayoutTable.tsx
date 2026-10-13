import { Button } from "@/components";

const PayoutTable = () => {
    const orderHistory = [
      {
        id: 1,
        date: "2024-10-03",
        amount: "N22,345",
        status: "success",
      },
      {
        id: 2,
        date: "2024-09-03",
        amount: "N22,345",
        status: "failed",
      },
      {
        id: 3,
        date: "2024-09-03",
        amount: "N22,345",
        status: "pending",
      },
      {
        id: 4,
        date: "2024-09-03",
        amount: "N22,345",
        status: "success",
      },
    ];

    const getStatusStyles = (status: string) => {
        switch (status) {
          case 'success':
            return 'bg-successBg text-success';
          case 'failed':
            return 'bg-card text-error';
          case 'pending':
            return 'bg-pending text-white';
          default:
            return 'bg-gray text-black';
        }
      };
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse mt-5">
          <thead className="text-black text-15 font-medium font-outfit">
            <tr>
              <th className="py-3 w-[200px]">Amount</th>
              <th className="py-3 w-[200px]">Requested On</th>
              <th className="py-3 w-full lg:w-[5rem]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory?.map((order) => (
              <tr
                key={order.id}
                className="text-16 font-normal font-outfit gap-5 text-nowrap border-b border-primaryLight first:border-t"
              >
                <td className="py-3 pr-5 w-[200px] text-nowrap gap-3"> {order.amount}</td>
                <td className="py-3 pr-5 w-[200px]">{order?.date}</td>
                <td className="py-3 w-full lg:w-[5rem]"><Button bg={`${getStatusStyles(order?.status)}`} type="button" color={`text-${order?.status}`}>{order?.status}</Button> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export { PayoutTable };
  