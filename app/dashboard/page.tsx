"use client";
import React, { useState, useEffect } from "react";
import { auth } from "@/auth";
import SidebarTabs from "@/components/SideBar/SidebarTabs";
import MasukData from "@/components/MasukData/MasukData";
import BensinTable from "@/components/HargaBensin/Bensin";

const Dashboard = () => {
  const [session, setSession] = useState(null); // State to hold session data
  const [activeTab, setActiveTab] = useState("berita-pemuda"); // Default active tab

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await auth();
        setSession(sessionData); // Set the session once fetched
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession(); // Fetch session data on component mount
  }, []); // Empty dependency array ensures useEffect runs once

  const tabs = [
    { label: "Masukkan Data", href: "masuk-data" },
    { label: "Ubah Harga Bensin", href: "ubah-harga-bensin" },
    { label: "Riwayat Memasukkan Data", href: "riwayat-memasukkan-data" },
    { label: "Validasi Pembayaran", href: "validasi-pembayaran" },
    { label: "Ubah Kata Sandi", href: "ubah-kata-sandi" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "masuk-data":
        return <MasukData />;
      case "ubah-harga-bensin":
        return <BensinTable />;
      case "sign-out":
        return (
          <div>
            <h1>coming soon</h1>
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
};

export default Dashboard;
