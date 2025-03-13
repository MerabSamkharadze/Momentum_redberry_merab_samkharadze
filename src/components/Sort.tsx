import React from "react";

export default function Sort() {
  return (
    <div className="rounded-[10px] mt-14 outline-1 outline-[#dee2e6] inline-flex justify-start items-center gap-[45px]">
      <div
        data-property-1="Default"
        className="w-[199px] h-11 relative rounded-[5px]"
      >
        <div className="w-[199px] h-11 px-[18px] py-2.5 left-0 top-0 absolute bg-white rounded-[10px] inline-flex justify-start items-center gap-2">
          <div className="text-center justify-start text-[#8338ec] text-base font-normal font-['FiraGO']">
            დეპარტამენტი
          </div>
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-3.5 h-2 left-[5px] top-[8px] absolute bg-[#8338ec]" />
          </div>
        </div>
      </div>
      <div data-property-1="Default" className="w-[199px] h-11 relative">
        <div className="w-[199px] h-11 px-[18px] py-2.5 left-0 top-0 absolute bg-white rounded-[10px] inline-flex justify-start items-center gap-2">
          <div className="text-center justify-start text-[#0d0e10] text-base font-normal font-['FiraGO']">
            პრიორიტეტი
          </div>
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-3.5 h-2 left-[5px] top-[8px] absolute bg-[#0d0e10]" />
          </div>
        </div>
      </div>
      <div
        data-property-1="Default"
        className="w-[200px] h-11 relative rounded-[10px]"
      >
        <div className="w-[200px] h-11 px-[18px] py-2.5 left-0 top-0 absolute bg-white rounded-[10px] inline-flex justify-start items-center gap-2">
          <div className="text-center justify-start text-[#0d0e10] text-base font-normal font-['FiraGO']">
            თანამშრომელი
          </div>
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-3.5 h-2 left-[5px] top-[8px] absolute bg-[#0d0e10]" />
          </div>
        </div>
      </div>
    </div>
  );
}
