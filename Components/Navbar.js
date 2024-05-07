"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image"

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: session } = useSession();
  if (session) {
    // return (
    //   <>
    //     Signed in as {session.user.email} <br />
    //     <button onClick={() => signOut()}>Sign out</button>
    //   </>
    // );
  }

  const logOut = () => {
  };

  return (
    <nav className="bg-blue-950 text-white flex justify-between px-4 md:h-16 flex-col md:flex-row items-center sticky top-0 gap-3 py-2">
      <Link
        className="logo font-bold text-lg flex gap-2 bg-white text-black justify-center items-center h-10 rounded-xl p-2"
        href={"/"}
      >
        Fund Start
        <span>
          <Image src="/fund.png" alt="fund" width={25} height={25} style={{"marginBottom": "10px"}}/>
        </span>
      </Link>

      {/* <ul className="flex justify-between gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Projects</li>
        <li>SignUp</li>
        <li>Login</li>
      </ul> */}

      <div className="relative">
        {session && (
          <>
            <button
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
              onBlur={()=>{setTimeout(() => {
                setShowDropdown(false)
              }, 250)}}
              id="dropdownDividerButton"
              data-dropdown-toggle="dropdownDivider"
              className="text-white bg-blue-700 mx-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownDivider"
              className={`z-10 ${
                showDropdown ? "" : "hidden"
              } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 left-[140px]`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <Link
                  href={"/login"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => signOut()}
                >
                  Sign out
                </Link>
              </div>
            </div>
          </>
        )}

        {/* {session && (
          <Link href="#">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center me-2 mb-2"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
          </Link>
        )} */}
        {!session && (
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center me-2 mb-2"
            >
              Sign in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
