import { useState } from "react";
import { Icons, paths } from "@/constants";
import { Link } from "react-router-dom";
import { Alert, Button, Input } from "antd";
import { apiServices } from "@/services";
import { skipToken } from "@reduxjs/toolkit/query";
import { formatCurrencyAmount } from "@/utils/formatCurrency";
import AppSkeleton from "./AppSkeleton";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/ultis";

const Cart = ({ reference }: { reference?: string | null }) => {
  const [couponCode, setCouponCode] = useState("");
  const [ applyCoupon, { isLoading: isApplyingCoupon }] = apiServices.useApplyCouponMutation();
  const [ updateCartQuantity, { isLoading: isUpdatingCartQuantity }] = apiServices.useUpdateCartQuantityMutation();

  const {
    data: cart,
    isLoading,
    isError,
  } = apiServices.useGetCartInformationsQuery(reference || skipToken);
  const {
    data: subscriptionAddons,
    isLoading: isSubscriptionAddonsLoading,
    isError: isSubscriptionAddonsError,
  } = apiServices.useGetSubscriptionsAddonsQuery();

  const cartAddons = subscriptionAddons?.data ?? [];

  const cartData = cart?.data;
  const mainSubscription = cartData?.info?.[0]?.subscription;

  const planTitle = mainSubscription?.title ?? "Graphic Design";
  const currencyCode = cartData?.info?.[0]?.currency ?? "NGN";

  const subtotal = formatCurrencyAmount(cartData?.subtotal, currencyCode);
  const total = formatCurrencyAmount(cartData?.total, currencyCode);

   const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [addonMonths, setAddonMonths] = useState<{ [key: number]: number }>({});
 
  const handleSelectAddon = (id: number) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((addonId) => addonId !== id));
      // Remove months tracking when deselecting
      const updatedAddonMonths = { ...addonMonths };
      delete updatedAddonMonths[id];
      setAddonMonths(updatedAddonMonths);
    } else {
      setSelectedAddons([...selectedAddons, id]);
      // Set default number of months to 1 when selecting addon
      setAddonMonths({ ...addonMonths, [id]: 1 });
    }
  };
 
  const handleRemoveAddon = (id: number) => {
    setSelectedAddons(selectedAddons.filter((addonId) => addonId !== id));
    // Remove months tracking when removing
    const updatedAddonMonths = { ...addonMonths };
    delete updatedAddonMonths[id];
    setAddonMonths(updatedAddonMonths);
  };
 
  // Update the month count in the UI right away, sync it to the server,
  // and roll back if the request fails.
  const setMonths = async (id: number, unit: number) => {
    if (!reference || isUpdatingCartQuantity) return;
 
    const previous = addonMonths[id] ?? 1;
    setAddonMonths((months) => ({ ...months, [id]: unit }));
 
    try {
      await updateCartQuantity({
        reference: reference,
        subscription_id: id,
        unit,
        default: true,
      }).unwrap();
    } catch (err) {
      setAddonMonths((months) => ({ ...months, [id]: previous }));
      toast.error(getErrorMessage(err, "Could not update quantity"));
    }
  };
 
  const handleIncreaseMonths = (id: number) => {
    setMonths(id, (addonMonths[id] ?? 1) + 1);
  };
 
  const handleDecreaseMonths = (id: number) => {
    const current = addonMonths[id] ?? 1;
    if (current > 1) setMonths(id, current - 1);
  };

  const handleApplyCoupon = async () => {
  const code = couponCode.trim();
  if (!code || !reference) return;
  try {
    const res = await applyCoupon({ code, reference }).unwrap();
    toast.success(res?.message ?? "Coupon applied");
    setCouponCode("");
  } catch (err) {
    toast.error(getErrorMessage(err, "Could not apply coupon"));
  }
};

  if (isLoading || isSubscriptionAddonsLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <section className="bg-white p-5 rounded-lg">
          <div className="bg-primary p-5 rounded-lg mb-8">
            <AppSkeleton
              title
              paragraph
              rows={2}
              className="[&_.ant-skeleton-title]:!bg-white/30 [&_.ant-skeleton-paragraph>li]:!bg-white/20"
            />
          </div>

          <AppSkeleton variant="card" count={4} rows={2} />
        </section>

        <section className="bg-white p-5 rounded-lg">
          <AppSkeleton variant="text" rows={1} />
          <AppSkeleton variant="card" rows={3} className="mt-5" />
          <AppSkeleton variant="text" rows={3} className="mt-8" />
          <div className="mt-6">
            <AppSkeleton variant="text" title={false} paragraph={false} />
          </div>
        </section>
      </div>
    );
  }

  if (isError || isSubscriptionAddonsError) {
    return (
      <Alert
        type="error"
        showIcon
        title="Unable to load your cart"
        description="Please try again in a moment."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 w-full">
      <section className="bg-white p-5 rounded-lg w-full">
        <div className="flex justify-start items-start flex-col bg-primary p-5 rounded-lg">
          <span className="text-white capitalize text-24 font-outfit font-bold">
            {planTitle}
          </span>
          <span className="text-white capitalize text-12 font-outfit font-regular">
            {subtotal} /month
          </span>
          <span className="text-white capitalize text-12 font-outfit font-regular">
            Renews on 03 Nov. 2026 |{" "}
            {mainSubscription?.type
              ? `${mainSubscription.type} plan`
              : "Subscription plan"}
          </span>
          <Link to={paths.choosePlan}>
            <button className="bg-pending hover:bg-white text-black capitalize text-16 font-outfit font-medium py-3 px-4 rounded-12 mt-2">
              Change Plan
            </button>
          </Link>
        </div>

        <div className="mt-10">
          <span className="text-14 font-regular font-outfit text-black">
            Other services that would help your business grow
          </span>

          {cartAddons?.map((addon) => {
            const { id, title, description, price, label, currency } = addon;

            return (
              <section className="bg-primaryLight p-5 rounded-lg mt-4" key={id}>
                <span className="text-24 text-black font-medium font-outfit">
                  {title}
                </span>
                <p className="text-15 text-black font-regular font-outfit w-full md:w-[16rem]">
                  {description}
                </p>
                <section className="block md:flex lg:flex justify-between items-center pt-2">
                  <p className="flex justify-start items-center">
                    {price ? (
                      <>
                        <span className="text-24 text-black font-bold font-outfit">
                          {formatCurrencyAmount(
                            price,
                            currency ?? currencyCode,
                          )}
                        </span>
                        <span className="text-14 text-black font-regular font-outfit">
                          /month
                        </span>
                      </>
                    ) : (
                      <span className="text-16 text-black font-semibold font-outfit">
                        Contact for pricing
                      </span>
                    )}
                  </p>

                  <button
                    className={`w-full mt-3 md:mt-0 lg:mt-0 md:w-[10rem] ${
                      selectedAddons.includes(id)
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    } border border-primary hover:bg-primary hover:text-white capitalize text-16 font-outfit font-medium py-3 px-4 rounded-12`}
                    onClick={() => handleSelectAddon(id)}
                  >
                    {selectedAddons.includes(id)
                      ? "Added"
                      : `${label ?? "Add subscription"}`}
                  </button>
                </section>
              </section>
            );
          })}
        </div>
      </section>

      {/* Right column - only selected addons */}
      <section className="relative bg-white p-5 rounded-lg mb-5 md:mb-0 lg:mb-0">
        <p className="flex justify-center items-center border-b border-b-border text-22 text-black font-medium font-outfit pb-2">
          Your Order
        </p>

        {cartAddons
          ?.filter((addon) => selectedAddons.includes(addon.id))
          .map((addon) => {
            const { id, title, price, currency } = addon;

            return (
              <section className="bg-primaryLight p-5 rounded-lg mt-4" key={id}>
                <span className="flex justify-between items-center text-24 text-black font-medium font-outfit">
                  {title}
                  <Icons.CancelIcon
                    className="text-gray cursor-pointer"
                    onClick={() => handleRemoveAddon(id)}
                  />
                </span>
                <section className="flex justify-between items-center pt-2">
                  <p className="flex justify-start items-center">
                    {price ? (
                      <>
                        <span className="text-24 text-black font-bold font-outfit">
                          {formatCurrencyAmount(
                            price,
                            currency ?? currencyCode,
                          )}
                        </span>
                        <span className="text-14 text-black font-regular font-outfit">
                          /month
                        </span>
                      </>
                    ) : (
                      <span className="text-16 text-black font-semibold font-outfit">
                        Contact for pricing
                      </span>
                    )}
                  </p>
                </section>

                {price && (
                  <div className="flex justify-between items-center gap-3 font-outfit py-2">
                    <span className="text-15 font-regular font-outfit text-black">
                      Month(s):
                    </span>
                    <div className="flex justify-center items-center gap-3">
                      <span className="w-5 h-5">
                        <Icons.MinusIcon
                          className="cursor-pointer"
                          onClick={() => handleDecreaseMonths(id)}
                          size={20}
                        />
                      </span>
                      {addonMonths[id]}

                      <span className="w-5 h-5">
                        <Icons.CirclePlusIcon
                          className="cursor-pointer"
                          onClick={() => handleIncreaseMonths(id)}
                          size={20}
                        />
                      </span>
                    </div>
                  </div>
                )}

                {price && (
                  <p className="text-15 text-black font-regular font-outfit w-full md:w-[16rem]">
                    Total: {""}
                    <span className="text-20 font-bold font-outfit text-primary">
                      {formatCurrencyAmount(
                        price * addonMonths[id],
                        currency ?? currencyCode,
                      )}
                    </span>
                  </p>
                )}
              </section>
            );
          })}


        <div className="pt-6">
          <span className="text-14 font-regular font-outfit text-black">
            Have a promo code?
          </span>

          {cartData?.promo_code ? (
            <p className="mt-2 text-15 font-outfit text-black">
              Code <span className="font-bold text-primary">{cartData.promo_code}</span> applied
            </p>
          ) : (
            <Input.Search
              className="mt-2"
              size="large"
              placeholder="Enter promo code"
              enterButton="Apply"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onSearch={handleApplyCoupon}
              loading={isApplyingCoupon}
              disabled={!reference}
            />
          )}


        </div>  

        <div className="py-10">
          <p className="flex justify-between items-center text-16 text-blackHeader font-normal font-outfit">
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </p>
          <p className="flex justify-between items-center text-16 text-blackHeader font-normal font-outfit">
            <span>Promo Code</span>
            <span>{cartData?.promo_code ?? "—"}</span>
          </p>

          {cartData?.discounted != null && Number(cartData.discounted) > 0 && (
            <p className="flex justify-between items-center text-16 text-blackHeader font-normal font-outfit">
              <span>Discount</span>
              <span>
                -{formatCurrencyAmount(cartData.discounted, currencyCode)}
              </span>
            </p>
          )}

          <p className="flex justify-between items-center text-20 text-black font-medium font-outfit">
            <span>Total</span>
            <span>{total}</span>
          </p>
        </div>

        <div className="lg:absolute bottom-5 left-5 right-5">
          <Link to={paths.checkout}>
            <Button
              type="primary"
              className="text-18 font-semibold font-outfit w-full"
            >
              Go to Checkout
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cart;
