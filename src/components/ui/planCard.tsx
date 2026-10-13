
import { Icons } from "@/constants";
import { apiServices } from "@/services";
import { ChoosePlanAPIResponse, PlanCardProps } from "@/types/types";
import React, { useState } from "react";


const PlanCard: React.FC<PlanCardProps & { onSelectPlan: (id: string | number) => void }> = ({
  title,
  features,
  price,
  oldPrice,
  billing,
  buttonLabel,
  popular = false,
  highlight,
  mostPopular,
  description,
  subscription_id,
  onSelectPlan,
  isSelected,
}) => {
  // const navigate = useNavigate();
  const [ choosePlan, {isLoading: isChoosePlanLoading}] = apiServices.useChoosePlanMutation();
  const [loadingSubscriptionId, setLoadingSubscriptionId] = useState<string | number | null>(null);

  const handleChoosePlan = async (event: React.MouseEvent<HTMLButtonElement>) => {
     event.preventDefault(); // Prevent default form submission
      event.stopPropagation(); // Stop bubbling
      if (!isSelected || isChoosePlanLoading) return; // Ensure only selected plan submits


    setLoadingSubscriptionId(subscription_id);
      try {
        const payload: ChoosePlanAPIResponse = { subscription_id };
        await choosePlan(payload);
      } finally {
        setLoadingSubscriptionId(null); // Reset after submission
      }
  };


  return (
    <div className={`relative p-6 bg-white rounded-12 h-[640px] cursor-pointer ${
      isSelected ? "border-2 border-primary shadow-lg" : ""
    }`}
    onClick={(e) => {
      e.stopPropagation(); // Stop unintended clicks
      onSelectPlan(subscription_id);
    }}
    >
      {popular && (
        <div className={`flex justify-center items-end`}>
          <p className="absolute -top-4 bg-primary w-[8rem] font-outfit font-medium text-14 text-white px-3 py-1 rounded-12 text-center">
            {mostPopular}
          </p>
        </div>
      )}
      <section className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-medium font-outfit text-black">{title}</h3>
        {highlight && (
          <div className="bg-pending font-medium font-outfit text-black px-3 py-1 rounded-10 text-16">
            {highlight}
          </div>
        )}
      </section>
      <p className="text-gray text-14 font-regular font-outfit w-full leading-auto text-justify">
        {description}
      </p>

      <ul className="space-y-2 my-4">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 text-16 text-black font-outfit font-normal"
          >
            <Icons.CheckListIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <section className="absolute bottom-6 left-6 right-6">
        <div className="flex justify-start items-start flex-col">
          {oldPrice && (
            <span className="line-through text-16 font-medium font-outfit text-gray">
              {oldPrice}
            </span>
          )}
          <h4 className="mb-2">
            <span className="text-3xl font-outfit font-bold text-primary ">
              {price}
            </span>
            <span className="text-black text-medium font-outfit text-20">
              /mo
            </span>
          </h4>
          <p className="text-gray font-regular font-outfit mb-4">{billing}</p>
          <button
            onClick={(e) => handleChoosePlan(e)}
            className={`w-full py-3 px-4 rounded-lg transition duration-300 text-18 font-medium font-outfit ${
              loadingSubscriptionId === subscription_id
                ? "bg-primaryLight text-primary cursor-not-allowed"
                : isSelected
                ? "bg-primary text-white hover:bg-primary"
                : "bg-primaryLight text-primary"
            }`}
            disabled={isChoosePlanLoading || !isSelected} 
          >
            {isSelected
              ? loadingSubscriptionId === subscription_id
                ? "Processing..."
                : title
              : buttonLabel}
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlanCard;
