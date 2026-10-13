import {
  Button,
  CustomModal,
  DashboardLayout,
  InnerWrapper,
  OrderTable,
  PaymentMethod,
} from "@/components";
import { Icons, Images } from "@/constants";
import { Switch } from "antd";
import { useState } from "react";
import { AddAddon } from "./modules/AddAddon";
import { CancelPlanModal } from "./modules/CancelPlan";

const Billings = () => {
  const [ isAddAddon, setIsAddAddon ] = useState<boolean>(false);
  const [ isCancelPlan, setIsCancelPlan ] = useState<boolean>(false);

  const toggleAddAddon = () => {
    setIsAddAddon((prev) =>!prev);
  }

  const toggleCancelPlan = () => {
    setIsCancelPlan((prev) =>!prev);
  }

  const handleClose = () => {
    setIsAddAddon(false);
    setIsCancelPlan(false)
  }

  return (
    <DashboardLayout>
      <InnerWrapper>
        {/* Billing card */}
        <div className="flex md:grid md:grid-cols-2 gap-5 md:gap-10 overflow-x-auto">
          <div className="flex justify-start items-start flex-col bg-primary px-5 lg:px-10 py-12 rounded-16 w-[355px] md:w-full">
            <span className="text-15 lg:text-25 font-normal font-outfit text-white">
              Your main plan
            </span>
            <span className="text-30 lg:text-50 font-medium font-outfit text-white">
              Design basic
            </span>
            <p className="text-13 lg:text-14 font-normal font-outfit text-white">
              Renews on 03 Nov. 2021 |{" "}
              <span className="font-bold">N2,550,000</span> billed annually
            </p>

            <section className="flex justify-center items-center gap-5 mt-5">
              <Button type="button" bg="bg-pending" color="text-black">
                Change Plan
              </Button>

              <Button type="button" bg="border-2 border-white" onClick={toggleCancelPlan}>
                Cancel Plan
              </Button>
              
            </section>

            <section className="flex justify-center items-center gap-5 mt-5">
              <Switch checkedChildren={<Icons.CancelIcon size={15} color={`var(--colorError)`} className="mt-1" />}  unCheckedChildren={<Icons.CheckListIcon size={15} color={`var(--colorPrimary)`} />} style={{ background: "white" }} />
              <span className="text-16 font-normal font-outfit text-white">
                Auto-renew subscription
              </span>
            </section>
          </div>

          {/* card two */}
          <div className="bg-dashboardBg px-5 lg:px-10 py-12 rounded-16 w-[355px] md:w-full">
            <p className="text-25 font-normal font-outfit text-gray text-center text-nowrap">
              Your add-on plan
            </p>
            <section className="flex justify-center items-center flex-col pt-5">
              <img src={Icons.PlanAddon} alt="Add-on Icon" />
              <span className="text-15 font-normal font-outfit text-gray py-2">
                No active add-on plan
              </span>

              <Button type="button" bg="bg-primary" onClick={() => toggleAddAddon()}>
                Add new add-on plan
              </Button>
            </section>
          </div>
        </div>

        {/* payment method */}
        <PaymentMethod />

        {/* order history table for date, type and receipt */}
        <div className="px-10 py-5 rounded-16 bg-white mt-10">
          <p className="text-25 font-medium font-outfit text-black">
            Order History
          </p>
          <span className="text-14 text-gray font-normal font-outfit">
            Manage billing information and view receipts
          </span>

          {/* table here */}
          <OrderTable />
          {/* View More button placed outside the table */}
          <p className="flex justify-end items-center mt-3 text-primary underline text-16 font-medium font-outfit cursor-pointer">
            View More
          </p>
        </div>
      </InnerWrapper>
      {isAddAddon && (
            <CustomModal width={810} className="addon_modal" open={isAddAddon}  onCancel={handleClose} onClose={handleClose}>
                <div className="p-1 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-23 md:text-24 font-semibold font-outfit text-black text-center">Choose your preferred add-on plan</span>
                  <Icons.CancelIcon onClick={handleClose} size={20} className="cursor-pointer hidden md:block" />
                </div>
                  <div className="h-[28rem] overflow-auto">
                    <AddAddon/>
                  </div>
                </div>
            </CustomModal>
      )}

    {isCancelPlan && (
            <CustomModal width={500} className="addon_modal" open={isCancelPlan} >
                <div className="flex justify-center items-center flex-col p-5">
                  <img src={Images.RoboticImg} width={168} height={168} className="-mt-28" />
                  <CancelPlanModal close={handleClose} />
                </div>
            </CustomModal>
      )}
    </DashboardLayout>
  );
};

export default Billings;
