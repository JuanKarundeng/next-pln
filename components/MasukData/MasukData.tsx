"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const MasukData = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg "></div>
          {/* <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div> */}

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7 shadow-xl"
            >
              <h2 className="mb-10 text-3xl font-semibold text-black">
                Masukkan Data
              </h2>

              <form
                action="https://formbold.com/s/unique_form_id"
                method="POST"
              >
                <div className="mb-10 flex  gap-7 ">
                  <select
                    name="kecamatan"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none "
                  >
                    <option>Pilih Bagian</option>
                    <option value="keuangan-umum">Keuangan dan Umum</option>
                    <option value="niaga-pemasaran">Niaga dan Pemasaran</option>
                    <option value="jaringan">Jaringan</option>
                    <option value="transaksi-energi">
                      Transaksi Energi Listrik
                    </option>
                    <option value="perencanaan">Perencanaan</option>
                    <option value="konstruksi">Konstruksi</option>
                    <option value="k3l">
                      Keselamatan dan Kesehatan Kerja Lingkungan Hidup
                    </option>
                    <option value="pengadaan">Pengadaan</option>
                  </select>
                </div>
                <div className="mb-7 flex flex-col gap-7">
                  <input
                    type="text"
                    placeholder="Masukkan Plat Nomor"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none "
                  />
                </div>

                <div className="mb-10 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="number"
                    placeholder="Masukkan Kilometer awal"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="number"
                    placeholder="Masukkan Kilometer akhir"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>
                <div className="mb-10 flex  gap-7">
                  <input
                    type="number"
                    placeholder="Jumlah Pembayaran"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none"
                  />
                </div>

                <div className="mb-7 flex flex-col gap-7">
                  <select
                    name="kecamatan"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none "
                  >
                    <option>Pilih Jumlah CC</option>
                    <option value="1000">1000</option>
                    <option value="1200">1200</option>
                    <option value="1300">1300</option>
                    <option value="1500">1500</option>
                    <option value="1800">1800</option>
                    <option value="2000">2000</option>
                  </select>
                </div>

                <div className="mb-7 flex flex-col gap-7">
                  <select
                    name="kecamatan"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none "
                  >
                    <option>Pilih Jenis Bensin</option>
                    <option value="pertalite">Pertalite</option>
                    <option value="pertamax">Pertamax</option>
                    <option value="pertamax-turbo">Pertamax Turbo</option>
                    <option value="solar">Solar</option>
                    <option value="dexlite">Dexlite</option>
                    <option value="pertamina-dex">Pertamina Dex</option>
                  </select>
                </div>

                <div className="mb-10 flex  gap-7">
                  <div className="flex w-full flex-col">
                    <label htmlFor="">Foto Kilometer Awal</label>
                    <input
                      type="file"
                      name="kilo-awal"
                      className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <label htmlFor="">Foto Kilometer Akhir</label>
                    <input
                      type="file"
                      name="kilo-akhir"
                      className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    />
                  </div>
                </div>

                <div className="mb-10 flex  gap-7">
                  <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                    <div className="flex w-full flex-col">
                      <label htmlFor="">Foto Nota Pembayaran</label>
                      <input
                        type="file"
                        name="nota"
                        className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 xl:justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                  >
                    Kirim
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default MasukData;
