import { SubscriptionPlan } from "./auth.types";

export interface CartTransactionResponse {
  message: string;
  data: CartTransaction;
}

export interface CartTransaction {
  id: number;
  user_id: number;
  reference: string;
  subtotal: string;
  promo_code: string | null;
  discounted: string | null;
  total: string;
  status: string;
  main_subscription_id: number;
  created_at: string;
  updated_at: string;
  info: CartItem[];
  services: unknown[];
  transactions: CartItem[];
}

export interface CartItem {
  id: number;
  reference: string;
  subscription_id: number;
  default: number;
  duration: string;
  unit: number;
  total: string;
  company_id: number;
  currency: string;
  created_at: string;
  updated_at: string;
  subscription: SubscriptionPlan;
}


export interface ApplyCouponData {
  code: string,
  reference: string
}

export interface CartQuantity {
    subscription_id: number,
    unit: number,
    default: boolean
}