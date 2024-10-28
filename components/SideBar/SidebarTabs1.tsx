// SidebarTabs.tsx
import { useState } from "react";

interface SidebarTabsProps {
  tabs: { label: string; href: string }[];
  onSelect: (href: string) => void;
}

const SidebarTabs = ({ tabs, onSelect }: SidebarTabsProps) => {
  // Pastikan tabs tidak kosong
  const [activeTab, setActiveTab] = useState(
    tabs.length > 0 ? tabs[0].href : ""
  );

  const handleTabClick = (href: string) => {
    console.log("Tab clicked:", href); // Debugging
    setActiveTab(href);
    onSelect(href);
  };

  return (
    <ul className="space-y-2">
      {tabs.map((tab) => (
        <li key={tab.href}>
          <button
            className={`flex w-full rounded-sm px-3 py-2 text-base ${
              activeTab === tab.href
                ? "bg-stroke text-black dark:text-white"
                : "text-black dark:text-white"
            }`}
            onClick={() => handleTabClick(tab.href)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SidebarTabs;
