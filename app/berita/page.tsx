"use client";
import { useState } from "react";
import SidebarTabs from "@/components/SideBar/SidebarTabs";
import BeritaPemuda from "@/components/BeritaPemuda";
import BeritaOlahraga from "@/components/BeritaOlahraga";

export default function BeritaPage() {
  const tabs = [
    { label: "Berita Pemuda", href: "berita-pemuda" },
    { label: "Berita Olahraga", href: "berita-olahraga" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].href);

  const renderContent = () => {
    switch (activeTab) {
      case "berita-pemuda":
        return (
          <div>
            <BeritaPemuda />
          </div>
        );
      case "berita-olahraga":
        return (
          <div>
            <BeritaOlahraga />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/4">
              <div className="sticky top-[74px] rounded-lg border border-black p-4 shadow-solid-4 transition-all ">
                <SidebarTabs tabs={tabs} onSelect={setActiveTab} />
              </div>
            </div>

            <div className="w-full px-4 lg:w-3/4">
              <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
