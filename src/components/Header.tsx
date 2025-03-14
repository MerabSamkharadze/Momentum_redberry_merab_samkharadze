"use client";

import React from "react";
import Link from "next/link";
import AddEmploy from "./AddEmploy";

export default function Header() {
  return (
    <header className="w-[1920px] px-[120px] py-[30px] bg-white inline-flex justify-between items-center">
      <div className="flex justify-start items-center gap-1">
        <Link
          href="/"
          className="justify-start text-[#8338ec] text-[31px] font-display font-bold"
        >
          Momentum
        </Link>
        <div className="w-[38px] h-[38px] relative overflow-hidden">
          <img
            src="/Hourglass.svg"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex justify-start items-center gap-10">
        <AddEmploy />

        <Link
          href="/create-task"
          className="px-5 py-2.5 bg-[#8338ec] hover:bg-[#B588F4]  rounded-[5px] flex justify-center items-center gap-1"
        >
          <div className="w-5 h-5 relative">
            <div className="w-2.5 h-0 left-[5px] top-[10px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-white" />
            <div className="w-0 h-2.5 left-[10px] top-[5px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-white" />
            <div className="w-5 h-5 left-0 top-0 absolute opacity-0" />
          </div>
          <div className="flex gap-3 text-white text-base font-normal font-sans">
            შექმენი ახალი დავალება
          </div>
        </Link>
      </div>
    </header>
  );
}
