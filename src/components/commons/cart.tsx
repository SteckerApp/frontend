import { useState } from "react";
import { cartAddon } from "@/data/cart.addon";
import { Icons, paths } from "@/constants";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Cart = ({ type }: { type?: string | null }) => {
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [addonMonths, setAddonMonths] = useState<{ [key: number]: number }>({}); // Track number of months per addon

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

  const handleIncreaseMonths = (id: number) => {
    setAddonMonths({ ...addonMonths, [id]: addonMonths[id] + 1 });
  };

  const handleDecreaseMonths = (id: number) => {
    if (addonMonths[id] > 1) {
      setAddonMonths({ ...addonMonths, [id]: addonMonths[id] - 1 });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 w-full">
      <section className="bg-white p-5 rounded-lg w-full">
        <div className="flex justify-start items-start flex-col bg-primary p-5 rounded-lg">
          <span className="text-white capitalize text-24 font-outfit font-bold">
            Graphic {type ?? "Design"}
          </span>
          <span className="text-white capitalize text-12 font-outfit font-regular">
            N250,000 /month
          </span>
          <span className="text-white capitalize text-12 font-outfit font-regular">
            Renews on 03 Nov. 2021 | Annual plan
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

          {cartAddon?.map((addon) => {
            const { id, title, description, price, label } = addon;

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
                          N{price.toLocaleString()}
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
                    {selectedAddons.includes(id) ? "Added" : label}
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

        {cartAddon
          ?.filter((addon) => selectedAddons.includes(addon.id))
          .map((addon) => {
            const { id, title, price } = addon;

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
                          N{price.toLocaleString()}
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
                        <span className="w-5 h-5"><Icons.MinusIcon
                          className="cursor-pointer"
                          onClick={() => handleDecreaseMonths(id)}
                          size={20}
                        /></span>
                        {addonMonths[id]}
                        
                        <span className="w-5 h-5"><Icons.CirclePlusIcon
                          className="cursor-pointer"
                          onClick={() => handleIncreaseMonths(id)}
                          size={20}
                        /></span>
                    </div>
                  </div>
                )}

                {price && (
                  <p className="text-15 text-black font-regular font-outfit w-full md:w-[16rem]">
                    Total:{" "}
                    <span className="text-20 font-bold font-outfit text-primary">
                      N{(price * addonMonths[id]).toLocaleString()}
                    </span>
                  </p>
                )}
              </section>
            );
          })}

          <div className="py-10">
            <p className="flex justify-between items-center text-16 text-blackHeader font-normal font-outfit">
                <span>Subtotal</span>
                <span>N5,000.00</span>
            </p>
            <p className="flex justify-between items-center text-16 text-blackHeader font-normal font-outfit">
                <span>Promo Code</span>
                <span>SPARK01</span>
            </p>
            <p className="flex justify-between items-center text-20 text-black font-medium font-outfit">
                <span>Total</span>
                <span>N5,000.00</span>
            </p>
          </div>

          <div className="lg:absolute bottom-5 left-5 right-5">
            <Link to={paths.checkout}><Button type="primary" className="text-18 font-semibold font-outfit w-full">Go to Checkout</Button></Link>
          </div>
      </section>
    </div>
  );
};

export default Cart;
