import React from "react";


interface AffiliateCardProps {
    label: string,
    value: string | number,
    rate?: number,
    text: string
}


const AffiliateCard:React.FC<AffiliateCardProps> = (props) => {
  return (
    <div className={`w-[280px] lg:w-full flex justify-center items-center flex-col bg-white hover:bg-primary rounded-20 py-10 text-black hover:text-white cursor-pointer`}>
      <span className={`text-17 font-normal font-outfit`}>
        {props.label}
      </span>
      <span className={`text-40 font-medium font-outfit my-2`}>
        {props.value}
      </span>
      <p className={`text-12 font-normal font-outfit`}>
        {props.rate && <span className="font-bold">+{props.rate} % </span>} {props.text}
      </p>
    </div>
  );
};

export default AffiliateCard;
