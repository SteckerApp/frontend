import { PlanCard, Tabs } from "@/components";
import { Icons, paths } from "@/constants";
import { apiServices } from "@/services";
import { transformSubscriptionPlans } from "@/utils/transformSubscriptionPlans";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PricingPlans: React.FC = () => {
  const { data: subscription_plans, isLoading, isError } = apiServices.useGetSubscriptionsQuery();

  const [activePlanType, setActivePlanType] =
    useState<string>("Bi-annually");

  const [selectedSubscriptionId, setSelectedSubscriptionId] =
    useState<number | null>(null);

  const plans = useMemo(
    () =>
      subscription_plans?.data
        ? transformSubscriptionPlans(subscription_plans?.data)
        : [],
    [subscription_plans]
  );

  const filteredPlans = plans.filter(
    (plan) => plan.planType === activePlanType
  );

  const handleTabChange = (tab: string) => {
    setActivePlanType(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 flex flex-col items-center pb-10">
      <div className="bg-primary py-40 w-full">
        <Link to={paths.login}>
          <img
            src={Icons.LogoWhite}
            className="absolute top-10 left-[35%] sm:left-10"
          />
        </Link>
        <h2 className="flex justify-center items-center text-25 sm:text-30 md:text-60 font-medium mt-10 mb-6 font-outfit text-white gap-1 sm:gap-5">
          <Link to={paths.companyProfile}>
            <Icons.ArrowLeft size={24} />
          </Link>
          Choose preferred plan
        </h2>
      </div>

      <div className="bg-primaryLight rounded-[30px] mb-20 z-50 -mt-7">
        <Tabs
          tabs={["Monthly", "Bi-annually", "Annually"]}
          defaultActiveTab="Bi-annually"
          onTabChange={handleTabChange}
        />
      </div>

      <section className="px-5 lg:px-10 w-full">
        {isLoading ? (
          <p className="text-center">Loading subscription plans...</p>
        ) : isError ? (
          <p className="text-center text-red-500">
            Failed to load subscription plans. Please try again.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.subscription_id}
                {...plan}
                isSelected={
                  selectedSubscriptionId === plan.subscription_id
                }
                onSelectPlan={() =>
                  setSelectedSubscriptionId(plan.subscription_id)
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PricingPlans;
