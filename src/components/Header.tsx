import React from "react";
import Link from "next/link";

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
        <div
          data-property-1="Default"
          className="px-5 py-2.5 bg-white rounded-[5px] outline-offset-[-1px] outline-1 outline-[#8338ec] flex justify-center items-center gap-2.5"
        >
          <div className="justify-start  text-[#212529] text-base font-normal font-['FiraGO']">
            თანამშრომლის შექმნა
          </div>
        </div>
        <Link
          href="/createNewTask"
          className="px-5 py-2.5 bg-[#8338ec] rounded-[5px] flex justify-center items-center gap-1"
        >
          <div className="w-5 h-5 text-white relative">+</div>
          <div className="flex gap-3 text-white text-base font-normal font-sans">
            შექმენი ახალი დავალება
          </div>
        </Link>
      </div>
    </header>
  );
}
