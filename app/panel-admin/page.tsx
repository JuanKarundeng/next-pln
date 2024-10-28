"use client";

import { useState } from "react";
import SidebarTabs from "@/components/SideBar/SidebarTabs";
import Bensin from "@/components/Bensin/page";
import ValidasiPembayaran from "@/components/validasi-pembayaran/ValidasiPembayaran";

export default function PanelAdminPage() {
  const tabs = [
    { label: "Ubah Harga Bensin", href: "ubah-harga" },
    { label: "Validasi Pembayaran", href: "validasi-pembayaran" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].href);

  const renderContent = () => {
    switch (activeTab) {
      case "ubah-harga":
        return (
          <div>
            <Bensin />
          </div>
        );
      case "validasi-pembayaran":
        return (
          <div>
            <ValidasiPembayaran />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <section className="pb-16 pt-[70px] sm:px-10 sm:pt-32">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className="w-full sm:col-span-1">
              <div className="sticky pl-3 top-72 sm:top-[80px] rounded-lg border shadow-xl bg-white">
                <SidebarTabs tabs={tabs} onSelect={setActiveTab} />
              </div>
            </div>

            <div className="w-full pl-7 mt-10 sm:mt-[-30px] pr-3 sm:col-span-2">
              <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white sm:px-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
