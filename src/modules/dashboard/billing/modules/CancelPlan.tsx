import { Button } from "@/components";


const CancelPlanModal = ({ close } : { close: () => void}) => {
  return (
    <div>
      <p className="flex justify-center items-center mb-8 text-20 md:text-24 font-semibold font-outfit text-primary">
        We're sorry to see you go! 😩
      </p>
      <p className="text-15 font-normal font-outfit text-black">
        Your monthly subscription is not due until{" "}
        <span className="font-medium">May 10, 2020.</span> If you would like to
        proceed with canceling your subscription, please select{" "}
        <span className="font-medium">"Cancel Subscription"</span> below.
      </p>

      <div className="flex justify-center items-center gap-5 mt-5 w-full">
        <Button type="button" bg="bg-primary w-full" color="text-white" onClick={close}>Don’t cancel</Button>
        <Button type="button" bg="bg-white w-full" color="text-primary border border-primary">Cancel subscription</Button>
      </div>
    </div>
  );
};

export { CancelPlanModal };
