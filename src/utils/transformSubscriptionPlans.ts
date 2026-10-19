import { SubscriptionData, SubscriptionPlan } from "@/types/auth.types";


export interface PricingPlan {
  planType: string;
  title: string;
  features: string[];
  price: string;
  oldPrice: string;
  billing: string;
  buttonLabel: string;
  popular: boolean;
  mostPopular: string;
  description: string;
  highlight?: string;
subscription_id: number;
  isSelected?: boolean;
}


const formatPrice = (price: number, currency = "₦") =>
  `${currency}${price.toLocaleString("en-NG")}`;

const getFeatures = (plan: SubscriptionPlan): string[] => {
  if (!plan.metadata) return [];

  return plan.metadata.flatMap((item) => [
    ...(item.info?.map((feature) => feature.title) ?? []),
    ...(item.title ? [item.title] : []),
  ]);
};

export const transformSubscriptionPlans = (
  subscriptions: SubscriptionData
): PricingPlan[] => {
  const planTypes = [
    { key: "monthly", label: "Monthly" },
    { key: "bi-annually", label: "Bi-annually" },
    { key: "annually", label: "Annually" },
  ] as const;

  return planTypes.flatMap(({ key, label }) =>
    (subscriptions[key] ?? []).map((plan) => ({
      planType: label,
      subscription_id: plan.id,
      title: plan.title,
      features: getFeatures(plan),
      price: formatPrice(plan.price, plan.currency || "₦"),
      oldPrice: plan.discounted
        ? formatPrice(Number(plan.discounted), plan.currency || "₦")
        : "",
      billing: `${formatPrice(plan.price, plan.currency || "₦")} billed ${
        key === "monthly"
          ? "monthly"
          : key === "bi-annually"
            ? "bi-annually"
            : "annually"
      }`,
      buttonLabel: "Select plan",
      popular: plan.most_popular === "yes",
      mostPopular: "Most Popular",
      description: plan.description,
      ...(plan.save_up_to
        ? { highlight: `Save ${formatPrice(Number(plan.save_up_to), plan.currency || "₦")}` }
        : {}),
    }))
  );
};