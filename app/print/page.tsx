// "use client";
import Image from "next/image";
import React from "react";
import icon from "../../public/Logo_PLN_Vertikal.png";
import { tanggalFormat } from "@/utils/helper";

const Print = React.forwardRef(({ dataGet, tgl, namaTTD }, ref) => {
  const date = Date.now();
  const tanggal = tanggalFormat(date);

  return (
    <div ref={ref} className="sm:p-10 p-1 w-full relative h-[100vh] print-pdf">
      <div className="border-b-2 border-black w-full flex relative pb-8 items-center">
        <Image className="sm:w-20 w-10 absolute" src={icon} alt="" />
        <div className="w-full">
          <p className="font-bold text-center sm:text-xl text-sm">
            Perusahaan Listrik Negara UP3 Manado{" "}
          </p>
          <p className="text-center mt-2 sm:text-sm text-[12px]">
            Jl. Ahmad Yani No.17, Sario Utara
            <br />
            Kec. Sario, Kota Manado, Sulawesi Utara
          </p>
        </div>
      </div>
      <div className="">
        <p className="mt-2 sm:text-lg text-sm mb-5">
          Data Masuk Tanggal - {tanggalFormat(tgl)}{" "}
        </p>
        <div className="overflow-auto">
          <table className="w-full border-collapse sm:text-sm text-[10px] mt-6">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left bg-blue-400 text-white">
                  No
                </th>
                <th className="border border-gray-300 p-2 text-left bg-blue-400 text-white">
                  Bagian
                </th>
                <th className="border border-gray-300 p-2 text-left bg-blue-400 text-white">
                  Plat Nomor
                </th>
                <th className="border border-gray-300 p-2 text-left bg-blue-400 text-white">
                  Kilometer Awal
                </th>
                <th className="border border-gray-300 p-2 text-left bg-blue-400 text-white">
                  Kilometer Akhir
                </th>
                <th className="border border-gray-300 p-2 text-left bg-blue-400 text-white">
                  Biaya Pembayaran
                </th>
                <th className="border border-gray-300 p-2 text-left bg-blue-400 text-white">
                  Biaya Disetujui
                </th>
              </tr>
            </thead>
            <tbody>
              {dataGet.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
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
                      {item.pembayaran}
                    </td>
                    <td className="border border-gray-300 p-2 text-left">
                      {item.harga_disetujui}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end absolute bottom-4 right-6">
        <div className="text-center">
          <h1 className=" text-center sm:text-lg text-sm">Manado, {tanggal}</h1>
          <h1 className="mt-20  sm:text-lg text-sm  text-center border-b-2 pb-2 border-black">
            {namaTTD}
          </h1>
        </div>
      </div>
    </div>
  );
});

export default Print;
