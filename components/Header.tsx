"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Sidebar = ({ onClose, name, role, session }) => (
  <div className="fixed z-[1000] bg-black w-full h-[100vh] bg-opacity-70">
    <div className="top-0 left-0 w-[250px] h-full bg-white text-white z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/avatar.svg"
              alt="avatar"
              width={64}
              height={64}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-black font-semibold">{name}</p>
              <p className="text-black text-sm">{role}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-black text-2xl">
            &times;
          </button>
        </div>
        {session && (
          <ul className="space-y-5 mt-4">
            <li>
              <Link href="/masuk-data" className="text-black" onClick={onClose}>
                Masuk Data
              </Link>
            </li>
            <li>
              <Link
                href="/riwayat-data"
                className="text-black"
                onClick={onClose}
              >
                Riwayat Memasukkan Data
              </Link>
            </li>
            <li>
              <Link
                href="/ubah-kata-sandi"
                className="text-black"
                onClick={onClose}
              >
                Ubah Kata Sandi
              </Link>
            </li>
            {role === "admin" && (
              <ul className="space-y-5 mt-4">
                <li>
                  <Link
                    href="/panel-admin"
                    className="text-black"
                    onClick={onClose}
                  >
                    Panel Admin
                  </Link>
                </li>
                <li>
                  <Link
                    href="/daftar-akun"
                    className="text-black"
                    onClick={onClose}
                  >
                    Daftar Akun
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pendaftar-baru"
                    className="text-black"
                    onClick={onClose}
                  >
                    Pendaftar Baru
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        )}
        {session && (
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              onClose();
            }}
            className="mt-6 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-500"
          >
            Keluar
          </button>
        )}
      </div>
    </div>
  </div>
);

const Header = () => {
  const { data: session } = useSession();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => setOpenSidebar(!openSidebar);

  // Use useEffect to detect session changes
  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  return (
    <nav className="bg-[#ADD8E6] border-b border-gray-200 fixed w-full z-40">
      {openSidebar && (
        <Sidebar
          onClose={toggleSidebar}
          name={session?.user?.name || "Guest"}
          role={session?.user?.role || "User"}
          session={session}
        />
      )}
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {isLoggedIn && (
          <button className="sm:hidden block" onClick={toggleSidebar}>
            <GiHamburgerMenu size={24} />
          </button>
        )}

        <Link href="/dashboard">
          <div className="flex items-center">
            <img
              src="/Logo_PLN_horizontal.png"
              alt="logo"
              className="h-8 sm:h-[50px]"
            />
          </div>
        </Link>

        <div className="hidden sm:block">
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <ul className="hidden md:flex items-center gap-8 mr-5 font-semibold text-gray-600 hover:text-gray-800">
                <li>
                  <Link
                    href="/masuk-data"
                    className="border-r border-gray-500 pr-3 text-sm"
                  >
                    Masuk Data
                  </Link>
                </li>
                <li>
                  <Link
                    href="/riwayat-data"
                    className="border-r border-gray-500 pr-3"
                  >
                    Riwayat Memasukkan Data
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ubah-kata-sandi"
                    className="border-r border-gray-500 pr-3 text-sm"
                  >
                    Ubah Kata Sandi
                  </Link>
                </li>
                {session?.user?.role === "admin" && (
                  <ul className="flex gap-4">
                    <li>
                      <Link
                        href="/panel-admin"
                        className="border-r border-gray-500 pr-3 text-sm"
                      >
                        Panel Admin
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/daftar-akun"
                        className="border-r border-gray-500 pr-3 text-sm"
                      >
                        Daftar Akun
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pendaftar-baru"
                        className="border-r border-gray-500 pr-3 text-sm"
                      >
                        Pendaftar Baru
                      </Link>
                    </li>
                  </ul>
                )}
              </ul>
            )}

            {isLoggedIn && (
              <div className="flex gap-3 items-center">
                <div className="flex flex-col justify-center -space-y-1">
                  <span className="font-semibold text-gray-600 text-right capitalize">
                    {session.user.name}
                  </span>
                  <span className="font-xs text-gray-400 text-right capitalize">
                    {session.user.role === "user"
                      ? "Pengguna"
                      : session.user.role === "admin"
                      ? "Admin"
                      : ""}
                  </span>
                </div>
                <button
                  type="button"
                  className="text-sm ring-2 bg-gray-100 rounded-full"
                >
                  <Image
                    src={session.user.image || "/avatar.svg"}
                    alt="avatar"
                    width={64}
                    height={64}
                    className="w-8 h-8 rounded-full"
                  />
                </button>
              </div>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Keluar
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
