import { Button } from "@/components";

const AddAddon = () => {
    const services = [

      {
        name: "Proofreading",
        description: "Need help with your online presence?",
        action: "Add Plan",
        priceOrRenew: "N30,000",
        isSubscribed: false,
      },

      {
        name: "Webflow Development",
        description: "Need help with your online presence?",
        action: "Add Plan",
        priceOrRenew: "N30,000",
        isSubscribed: false,
      },
      {
        name: "Content Creation",
        description: "Need help with your online presence?",
        action: "Cancel plan",
        priceOrRenew: "22 Nov. 2021",
        isSubscribed: true,
      },

      {
        name: "Social Media Management",
        description: "Need help with your online presence?",
        action: "Cancel plan",
        priceOrRenew: "22 Nov. 2021",
        isSubscribed: true,
      },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {services.map((service, index) => (
          <article
            key={index}
            className="flex justify-start items-start flex-col bg-white p-6 rounded-lg w-full"
          >
            <span className="text-18 sm:text-21 md:text-24 text-black font-semibold sm:font-medium font-outfit">
              {service.name}
            </span>
            <span className="text-15 font-normal font-outfit text-black">
              {service.description} <br /> This is for you!
            </span>
            <section className="flex justify-between items-center w-full mt-5">
              <p className="text-12 sm:text-15 text-black font-normal font-outfit">
                {service.isSubscribed ? (
                  <p>Renews on <span className="font-semibold">{service.priceOrRenew}</span></p>
                ) : (

                  <p><span className="font-semibold">{service.priceOrRenew}</span>  /month</p>
                )}
              </p>

              <Button type="button" bg={`${
                  service.isSubscribed ? "bg-pending w-[6rem]" : "bg-primaryLight w-[6rem]"
                }`} color={service.isSubscribed ? "text-black" : "text-primary"}>
              {service.action}
              </Button>
            </section>
          </article>
        ))}
      </div>
    );
  };
  
  export { AddAddon };
  