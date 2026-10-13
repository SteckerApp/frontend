import React, { useState } from "react";

interface TabsProps {
  tabs: string[];
  defaultActiveTab?: string;
  onTabChange?: (activeTab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab = "", onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="flex space-x-0 md:space-x-4">
      {tabs?.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`py-4 px-4 md:px-6 font-outfit font-normal text-16 rounded-full ${
            activeTab === tab ? "bg-primary text-white font-medium" : "bg-transparent text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
