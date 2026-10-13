import React, { useState } from "react";

interface CustomTabProps {
  options: string[];
  contentMap: { [key: string]: React.ReactNode };
  isButton?: boolean;
  open?: () => void;
  buttonText?: string;
  buttonTextSmall?: string;
  width?: string
}

const CustomTab: React.FC<CustomTabProps> = ({
  options,
  contentMap,
  isButton,
  open,
  buttonText,
  buttonTextSmall,
  width
}) => {
  const [activeTab, setActiveTab] = useState<string>(options[0]);
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleTabClick = (option: string) => {
    if (activeTab !== option) {
      setIsFading(true);
      setTimeout(() => {
        setActiveTab(option);
        setIsFading(false);
      }, 300);
    }
  };

  return (
    <div className="custom-tab-container">
      <div className="flex justify-between items-center">
        <div className="tab-header flex w-[15rem] md:w-full overflow-x-auto">
          {options.map((option) => (
            <button
              key={option}
              className={`tab-button text-nowrap px-4 py-2 ${
                activeTab === option ? "active-tab" : ""
              }`}
              onClick={() => handleTabClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {isButton && (
          <>
              <button onClick={open} className={`hidden sm:block md:hidden lg:flex bg-primary text-white px-4 py-3 rounded-md font-normal font-outfit capitalize w-[4rem] ${width ? width : "md:w-[13rem]"}`}>
             {buttonText}
          </button>
          <button onClick={open} className="flex lg:hidden text-20 bg-primary text-white px-4 py-2 rounded-md font-normal font-outfit capitalize w-[3rem]">
            {buttonTextSmall}
          </button>
          </>
        )}
      </div>

      <div className={`tab-content ${isFading ? "fade-out" : ""}`}>
        {contentMap[activeTab]}
      </div>
    </div>
  );
};

export default CustomTab;
