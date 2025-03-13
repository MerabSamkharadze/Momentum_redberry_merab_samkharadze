// app/create-task/page.tsx

import React from "react";

export default function CreateTaskPage() {
  return (
    <div className="w-[1920px] h-[1550px] relative bg-white overflow-hidden">
      {/* ჰედერი */}
      {/* <div className="w-[1920px] px-28 py-7 left-0 top-0 absolute bg-white inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-1">
          <div className="justify-start text-violet-600 text-3xl font-normal font-['Fredoka_One']">
            Momentum
          </div>
          <div className="w-9 h-9 relative overflow-hidden">
            <div className="w-5 h-6 left-[9.50px] top-[6.46px] absolute bg-sky-300" />
            <div className="w-4 h-5 left-[11.02px] top-[10.98px] absolute bg-amber-400" />
            <div className="w-6 h-[3.44px] left-[7.98px] top-[4.54px] absolute bg-violet-600" />
            <div className="w-6 h-[3.44px] left-[7.98px] top-[30.02px] absolute bg-violet-600" />
            <div className="w-1 h-1 p-px left-[20.82px] top-[8.73px] absolute bg-white rounded-[20px] inline-flex justify-start items-center gap-2.5">
              <div className="w-0.5 h-0.5 bg-orange-600" />
            </div>
            <div className="w-1 h-1 p-px left-[13.82px] top-[8.73px] absolute bg-white rounded-[20px] inline-flex justify-start items-center gap-2.5">
              <div className="w-0.5 h-0.5 bg-orange-600" />
            </div>
            <div className="w-1 h-0.5 left-[17.41px] top-[13.80px] absolute bg-zinc-700" />
            <div className="w-5 h-px left-[9.31px] top-[29.64px] absolute bg-zinc-700" />
            <div className="w-5 h-px left-[9.31px] top-[7.40px] absolute bg-zinc-700" />
          </div>
        </div>

        <div className="flex justify-start items-center gap-10">
          <div
            data-property-1="Default"
            className="px-5 py-2.5 bg-white rounded-[5px]  outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2.5"
          >
            <div className="justify-start text-neutral-800 text-base font-normal font-['FiraGO']">
              თანამშრომლის შექმნა
            </div>
          </div>
          <div
            data-property-1="Default"
            className="px-5 py-2.5 bg-violet-600 rounded-[5px] flex justify-center items-center gap-1"
          >
            <div className="w-5 h-5 relative">
              <div className="w-2.5 h-0 left-[5px] top-[10px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-white" />
              <div className="w-0 h-2.5 left-[10px] top-[5px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-white" />
              <div className="w-5 h-5 left-0 top-0 absolute opacity-0" />
            </div>
            <div className="justify-start text-white text-base font-normal font-['FiraGO']">
              შექმენი ახალი დავალება
            </div>
          </div>
        </div>
      </div> */}

      {/* გვერდის სათაური */}
      <div className="w-[1684px] left-[118px] top-[140px] absolute justify-start text-neutral-800 text-4xl font-semibold font-['FiraGO']">
        შექმენი ახალი დავალება
      </div>

      {/* დიდი კონტეინერი */}
      <div className="w-[1684px] h-[958px] left-[118px] top-[206px] absolute bg-purple-50/60 rounded  outline-[0.30px] outline-offset-[-0.30px] outline-violet-200">
        {/* მარცხენა სექცია */}
        <div className="w-[550px] left-[55px] top-[65px] absolute inline-flex flex-col justify-start items-start gap-14">
          {/* სათაური */}
          <div
            data-property-1="Enabled"
            className="self-stretch h-28 flex flex-col justify-start items-start"
          >
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="py-1.5 inline-flex justify-end items-start">
                <div className="justify-start text-neutral-700 text-base font-normal font-['FiraGO']">
                  სათაური
                </div>
                <div className="w-2 h-2 relative overflow-hidden">
                  <div className="w-1.5 h-1.5 left-[1.18px] top-[0.96px] absolute bg-neutral-700" />
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="w-[550px] p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 inline-flex justify-start items-center gap-2.5">
                  <div />
                </div>
                <div className="self-stretch px-px flex flex-col justify-start items-start gap-0.5">
                  <div className="self-stretch justify-start text-gray-500 text-[10px] font-['FiraGO']">
                    მინიმუმ 2 სიმბოლო
                  </div>
                  <div className="self-stretch justify-start text-gray-500 text-[10px] font-['FiraGO']">
                    მაქსიმუმ 255 სიმბოლო
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* აღწერა */}
          <div
            data-property-1="Variant8"
            className="w-[550px] h-48 flex flex-col justify-start items-start"
          >
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="py-1.5 inline-flex justify-end items-start">
                <div />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="w-[550px] h-32 p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 inline-flex justify-start items-start gap-2.5" />
                <div className="self-stretch px-px flex flex-col justify-start items-start gap-0.5">
                  <div className="self-stretch justify-start text-gray-500 text-[10px] font-['FiraGO']">
                    მინიმუმ 2 სიმბოლო
                  </div>
                  <div className="self-stretch justify-start text-gray-500 text-[10px] font-['FiraGO']">
                    მაქსიმუმ 255 სიმბოლო
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* პრიორიტეტი & სტატუსი */}
          <div className="self-stretch inline-flex justify-start items-start gap-8">
            {/* პრიორიტეტი */}
            <div
              data-property-1="Priority"
              className="h-64 inline-flex flex-col justify-start items-start"
            >
              <div className="py-1.5 inline-flex justify-end items-start">
                <div className="justify-start text-neutral-700 text-base font-normal font-['FiraGO']">
                  პრიორიტეტი
                </div>
                <div className="w-2 h-2 relative overflow-hidden">
                  <div className="w-1.5 h-1.5 left-[1.18px] top-[0.96px] absolute bg-neutral-700" />
                </div>
              </div>
              <div className="w-64 h-11 p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 inline-flex justify-start items-center gap-1.5">
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-3 h-2 left-[2px] top-[4.50px] absolute bg-yellow-400" />
                </div>
                <div className="flex-1 justify-start text-neutral-950 text-sm font-light font-['FiraGO']">
                  საშუალო
                </div>
                <div className="w-3.5 h-3.5 relative">
                  <div className="w-2.5 h-1 left-[2.38px] top-[5.22px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-neutral-700" />
                  <div className="w-3.5 h-3.5 left-[14px] top-[14px] absolute origin-top-left -rotate-180 opacity-0" />
                </div>
              </div>
            </div>

            {/* სტატუსი */}
            <div
              data-property-1="Status"
              className="h-20 inline-flex flex-col justify-start items-start"
            >
              <div className="py-1.5 inline-flex justify-end items-start">
                <div className="justify-start text-neutral-700 text-base font-normal font-['FiraGO']">
                  სტატუსი
                </div>
                <div className="w-2 h-2 relative overflow-hidden">
                  <div className="w-1.5 h-1.5 left-[1.18px] top-[0.96px] absolute bg-neutral-700" />
                </div>
              </div>
              <div className="w-64 p-3.5 bg-white rounded-[5px]  outline-1 outline-gray-300 inline-flex justify-start items-center gap-2.5">
                <div className="flex-1 justify-start text-neutral-950 text-sm font-light font-['FiraGO']">
                  დასაწყები
                </div>
                <div className="w-3.5 h-3.5 relative">
                  <div className="w-2.5 h-1 left-[2.38px] top-[5.22px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-neutral-700" />
                  <div className="w-3.5 h-3.5 left-[14px] top-[14px] absolute origin-top-left -rotate-180 opacity-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-property-1="Disabled"
          className="w-[550px] left-[766px] top-[234px] absolute inline-flex flex-col justify-start items-start"
        >
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="py-1.5 inline-flex justify-end items-start">
              <div className="justify-start text-gray-400 text-base font-normal font-['FiraGO']">
                პასუხისმგებელი თანამშრომელი
              </div>
              <div className="w-2 h-2 relative overflow-hidden">
                <div className="w-1.5 h-1.5 left-[1.18px] top-[0.96px] absolute bg-zinc-200" />
              </div>
            </div>
            <div className="w-[550px] p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 inline-flex justify-start items-center gap-2.5">
              <div className="flex-1 justify-start" />
              <div className="w-3.5 h-3.5 relative">
                <div className="w-2.5 h-1 left-[2.38px] top-[5.22px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-400" />
                <div className="w-3.5 h-3.5 left-[14px] top-[14px] absolute origin-top-left -rotate-180 opacity-0" />
              </div>
            </div>
          </div>
        </div>

        <div
          data-property-1="Enabled"
          className="w-[550px] h-28 left-[766px] top-[65px] absolute inline-flex flex-col justify-start items-start"
        >
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="py-1.5 inline-flex justify-end items-start">
              <div className="justify-start text-neutral-700 text-base font-normal font-['FiraGO']">
                დეპარტამენტი
              </div>
              <div className="w-2 h-2 relative overflow-hidden">
                <div className="w-1.5 h-1.5 left-[1.18px] top-[0.96px] absolute bg-neutral-700" />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 inline-flex justify-start items-center gap-2.5">
                <div />
                <div className="inline-flex flex-col justify-start items-start">
                  <div className="relative">
                    <div className="relative">
                      <div className=" outline-[1.50px] outline-offset-[-0.75px] outline-neutral-700" />
                      <div className="origin-top-left rotate-[3.14deg] opacity-0 border border-neutral-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* შენახვის ღილაკი */}
        <div className="w-[1261px] left-[55px] top-[700px] absolute inline-flex flex-col justify-end items-end gap-2.5">
          <div className="px-5 py-2.5 bg-violet-600 rounded-[5px] inline-flex justify-center items-center gap-1">
            <div className="justify-start text-white text-lg font-normal font-['FiraGO']">
              დავალების შექმნა
            </div>
          </div>
        </div>

        {/* სხვა ელემენტები (Default) */}
        <div
          data-property-1="Default"
          className="w-80 left-[766px] top-[479px] absolute inline-flex flex-col justify-start items-start gap-1"
        >
          <div className="inline-flex flex-col justify-start items-start">
            <div className="inline-flex justify-center items-center gap-2.5">
              <div />
            </div>
            <div className="p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 inline-flex justify-start items-center gap-1.5 overflow-hidden">
              <div className="inline-flex flex-col justify-start items-start overflow-hidden">
                <div className="bg-slate-600" />
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
