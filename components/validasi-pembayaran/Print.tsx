"use client";
import React, { ForwardedRef } from "react";
import Image from "next/image";
import icon from "../../public/Logo_PLN_Vertikal.png";
import { tanggalFormat } from "@/utils/helper";

type DataItem = {
  bagian: string;
  plat: string;
  km_awal: number;
  km_akhir: number;
  pembayaran: number;
  harga_disetujui: number;
};

type PrintProps = {
  dataGet: DataItem[];
  tgl: string;
  namaTTD: string;
};

// Define the table headers
const headers = [
  "No",
  "Bagian",
  "Plat",
  "KM Awal",
  "KM Akhir",
  "Pembayaran",
  "Harga Disetujui",
];

const Print = React.forwardRef<HTMLDivElement, PrintProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { dataGet, tgl, namaTTD } = props;

    return (
      <div
        ref={ref}
        className="sm:p-10 p-1 w-full relative h-[100vh] print-pdf"
      >
        {/* Header Section */}
        <div className="border-b-2 border-black w-full flex relative pb-8 items-center">
          <Image
            className="sm:w-20 w-10 absolute"
            src={icon}
            alt="Logo PLN"
            priority
          />
          <div className="w-full text-center">
            <p className="font-bold sm:text-xl text-sm">
              Perusahaan Listrik Negara UP3 Manado
            </p>
            <p className="mt-2 sm:text-sm text-[12px]">
              Jl. Ahmad Yani No.17, Sario Utara
              <br />
              Kec. Sario, Kota Manado, Sulawesi Utara
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div>
          <p className="mt-2 sm:text-lg text-sm mb-5">
            Data Masuk Tanggal - {tanggalFormat(tgl)}
          </p>
          <div className="overflow-auto">
            <table className="w-full border-collapse sm:text-sm text-[10px] mt-6">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 p-2 text-left bg-blue-400 text-white"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataGet.map((item, index) => (
                  <tr key={item.plat}>
                    <td className="border border-gray-300 p-2 text-left">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2 text-left">
                      {item.bagian}
                    </td>
                    <td className="border border-gray-300 p-2 text-left">
                      {item.plat}
                    </td>
                    <td className="border border-gray-300 p-2 text-left">
                      {item.km_awal}
                    </td>
                    <td className="border border-gray-300 p-2 text-left">
                      {item.km_akhir}
                    </td>
                    <td className="border border-gray-300 p-2 text-left">
                      {item.pembayaran.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="border border-gray-300 p-2 text-left">
                      {item.harga_disetujui.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature Section */}
        <div className="flex justify-end mt-2 absolute ">
          <div className="text-center">
            <h1 className="sm:text-lg text-sm">Manado, {tanggalFormat(tgl)}</h1>
            <h1 className="mt-20 sm:text-lg text-sm border-b-2 pb-2 border-black">
              {namaTTD}
            </h1>
          </div>
        </div>
      </div>
    );
  }
);

Print.displayName = "Print";

export default Print;
