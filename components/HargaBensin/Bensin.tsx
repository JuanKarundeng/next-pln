"use client"; // Tetap menggunakan Client Component karena ada interaksi UI

import React from "react";

const BensinData = [
  { _id: 1, name: "Pertalite", price: 10000, lastprice: 9000 },
  { _id: 2, name: "Pertamax", price: 14000, lastprice: 13500 },
  { _id: 3, name: "Solar", price: 7000, lastprice: 6800 },
];

const BensinTable = () => {
  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Jenis Bensin</th>
          <th className="py-3 px-6 text-left text-sm">Harga Lama</th>
          <th className="py-3 px-6 text-left text-sm">Harga Baru</th>
        </tr>
      </thead>
      <tbody>
        {BensinData.map((item) => (
          <tr key={item._id}>
            <td className="py-3 px-6">{item.name}</td>
            <td className="py-3 px-6">{item.lastprice}</td>
            <td className="py-3 px-6">{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BensinTable;
