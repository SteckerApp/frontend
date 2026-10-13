const OrderTable = () => {
  const orderHistory = [
    {
      id: 1,
      date: "2024-10-03",
      type: "Subscription Renewal",
      receipt: "/path/to/receipt1.pdf",
    },
    {
      id: 2,
      date: "2024-09-03",
      type: "Initial Purchase",
      receipt: "/path/to/receipt2.pdf",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse mt-5">
        <thead className="text-black text-14 font-medium font-outfit">
          <tr>
            <th className="py-3">Date</th>
            <th className="py-3">Type</th>
            <th className="py-3">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory?.map((order) => (
            <tr
              key={order.id}
              className="text-16 font-normal font-outfit gap-5 text-nowrap"
            >
              <td className="py-3 pr-5">{order.date}</td>
              <td className="py-3 pr-5">{order.type}</td>
              <td className="py-3 w-full md:w-[5rem]">
                <a
                  href={order?.receipt}
                  className="text-primary bg-dashboardBg px-3 py-2 rounded-md font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
