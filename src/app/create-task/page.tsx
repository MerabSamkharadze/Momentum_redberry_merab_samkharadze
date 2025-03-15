"use client";

import React, { useState } from "react";
import Image from "next/image";
import Down from "../../../public/svg/Down";

// ნიმუშური მონაცემები
const departments = ["IT", "HR", "Finance"];
const employees = ["გიორგი", "ანა", "მიხეილ"];
const priorities = [
  {
    label: "მაღალი",
    style: "text-violet-600 text-base font-normal font-['FiraGO']",
  },
  {
    label: "საშუალო",
    style: "text-neutral-950 text-sm font-light font-['FiraGO']",
  },
];
const statuses = [
  "დასაწყები",
  "პროგრესში",
  "მზად ტესტირებისთვის",
  "დასრულებული",
];

const TaskForm = () => {
  // ველის მონაცემები
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deadline, setDeadline] = useState("");

  // Dropdown -ის გახსნის მდგომარეობები
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openDeadline, setOpenDeadline] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // აქ შეგიძლიათ გააკეთოთ API რექვესთი, ჩათანოთ bearerAuth ტოკენი, და ა.შ.
    console.log({
      title,
      description,
      selectedDepartment,
      selectedEmployee,
      selectedPriority,
      selectedStatus,
      deadline,
    });
  };

  return (
    <div className=" ml-[88px] p-8">
      <div className="w-[1684px] justify-start text-neutral-800 text-4xl font-semibold font-sans mb-6">
        შექმენი ახალი დავალება
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[1684px] h-[958px] relative bg-purple-50/60 rounded  outline-[0.30px] outline-offset-[-0.30px] outline-violet-200 p-10"
      >
        {/* მარცხენა მხარე – სათაური, აღწერა, პრიორიტეტი და სტატუსი */}
        <div className="w-[550px]  ml-[55px] mt-[65px] flex flex-col gap-14">
          {/* სათაური */}
          <div className="h-28 flex flex-col">
            <div className="py-1.5 flex justify-start items-start">
              <label className="text-neutral-700 text-base font-normal font-sans">
                სათაური
              </label>
              <div className="w-2 h-2 -mt-1 relative ">*</div>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[550px] p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200"
                placeholder="სათაური"
              />
              <div className="text-gray-500 text-[10px] font-['FiraGO']">
                მინიმუმ 2 სიმბოლო | მაქსიმუმ 255 სიმბოლო
              </div>
            </div>
          </div>

          {/* აღწერა */}
          <div className="w-[550px] h-48 flex flex-col">
            <div className="py-1.5 flex justify-start items-start">
              <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                აღწერა
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-[550px] h-32 p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200"
                placeholder="აღწერა"
              />
              <div className="text-gray-500 text-[10px] font-['FiraGO']">
                მინიმუმ 2 სიმბოლო | მაქსიმუმ 255 სიმბოლო
              </div>
            </div>
          </div>

          {/* პრიორიტეტი და სტატუსი */}
          <div className="flex gap-8">
            {/* პრიორიტეტი */}
            <div className="h-64 flex flex-col">
              <div className="py-1.5 flex justify-start items-center">
                <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                  პრიორიტეტი
                </label>
                <div className="w-2 h-2 -mt-5 relative ">*</div>
              </div>
              <div
                className="w-64 h-11 p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 flex items-center  justify-between cursor-pointer"
                onClick={() => setOpenPriority(!openPriority)}
              >
                {selectedPriority ? (
                  <span
                    className={
                      priorities.find((p) => p.label === selectedPriority)
                        ?.style
                    }
                  >
                    {selectedPriority}
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm font-light font-['FiraGO']">
                    პრიორიტეტი
                  </span>
                )}
                <div className="w-3.5 h-3.5 relative">
                  <Down />
                </div>
              </div>
              {openPriority && (
                <div className="mt-2 w-64 bg-white rounded border border-violet-600">
                  {priorities.map((p) => (
                    <div
                      key={p.label}
                      className="p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedPriority(p.label);
                        setOpenPriority(false);
                      }}
                    >
                      <span className={p.style}>{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* სტატუსი */}
            <div className="h-20 flex flex-col">
              <div className="py-1.5 flex justify-start items-center">
                <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                  სტატუსი
                </label>
                <div className="w-2 h-2 -mt-5 relative ">*</div>
              </div>
              <div
                className="w-64 p-3.5 bg-white rounded-[5px]  outline-1 outline-gray-300 flex items-center gap-2.5 cursor-pointer"
                onClick={() => setOpenStatus(!openStatus)}
              >
                <span className="flex-1 text-neutral-950 text-sm font-light font-['FiraGO']">
                  {selectedStatus || "დასაწყები"}
                </span>
                <div className="w-3.5 h-3.5 relative">
                  <Down />
                </div>
              </div>
              {openStatus && (
                <div className="mt-2 w-64 rounded border border-violet-600">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      className="p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedStatus(status);
                        setOpenStatus(false);
                      }}
                    >
                      <span className="text-neutral-950 text-sm font-light font-['FiraGO']">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* მარჯვენა მხარე – დეპარტამენტი, თანამშრომელი და დეკლაინი */}
        <div className="absolute left-[766px] top-[105px] w-[550px] flex flex-col gap-6">
          {/* დეპარტამენტი */}
          <div className="h-28 flex flex-col">
            <div className="py-1.5 flex justify-start items-center">
              <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                დეპარტამენტი
              </label>
              <div className="w-2 h-2 -mt-5 relative ">*</div>
            </div>
            <div className="relative">
              <div
                className="p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
                onClick={() => setOpenDepartment(!openDepartment)}
              >
                <span>{selectedDepartment || "დეპარტამენტი"}</span>
                <div className="w-3.5 h-3.5 relative">
                  <Down />
                </div>
              </div>
              {openDepartment && (
                <div className="mt-2 w-full bg-white rounded border border-violet-600">
                  {departments.map((dep) => (
                    <div
                      key={dep}
                      className="p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedDepartment(dep);
                        setOpenDepartment(false);
                      }}
                    >
                      <span>{dep}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* პასუხისმგებელი თანამშრომელი */}
          <div className="w-[550px] h-28 flex flex-col">
            <div className="py-1.5 flex justify-start items-center">
              <label className="text-gray-400 text-base font-normal font-['FiraGO']">
                პასუხისმგებელი თანამშრომელი
              </label>
              <div className="w-2 h-2 relative overflow-hidden">
                <div className="w-1.5 h-1.5 absolute bg-zinc-200" />
              </div>
            </div>
            <div className="relative">
              <div
                className="p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
                onClick={() => setOpenEmployee(!openEmployee)}
              >
                <span>{selectedEmployee || "თანამშრომელი"}</span>
                <div className="w-3.5 h-3.5 relative">
                  <Down />
                </div>
              </div>
              {openEmployee && (
                <div className="mt-2 w-full bg-white rounded border border-violet-600">
                  {employees.map((emp) => (
                    <div
                      key={emp}
                      className="p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setOpenEmployee(false);
                      }}
                    >
                      <span>{emp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* დედლაინი */}
          <div className="w-80 flex flex-col gap-1">
            <div className="flex flex-col">
              <label className="w-20 py-1.5 flex justify-center items-center text-neutral-700 text-base font-normal font-['FiraGO']">
                დედლაინი
              </label>
            </div>
            <div
              className="w-80 h-11 relative bg-white rounded-[5px]  outline-1 outline-violet-600 overflow-hidden cursor-pointer"
              onClick={() => setOpenDeadline(!openDeadline)}
            >
              <div className="absolute left-[36px] top-[12.50px] text-gray-400 text-sm font-normal font-['FiraGO'] leading-tight">
                {deadline || "DD/MM/YYYY"}
              </div>
              <div className="absolute left-[14px] top-[14.50px] w-4 h-4 overflow-hidden">
                <div className="w-3.5 h-3.5 absolute bg-slate-600" />
              </div>
              <div className="absolute left-[35px] top-[12px] w-px h-5 bg-neutral-800" />
            </div>
            {openDeadline && (
              <div className="w-80 p-4 bg-white shadow-lg flex flex-col gap-5">
                {/* კალენდრის ჰედერი */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-black text-xs font-bold font-['FiraGO']">
                      იანვარი 2025
                    </span>
                    <div className="w-2 h-1 bg-black" />
                  </div>
                  <div className="flex gap-2">
                    {/* აქ შეგიძლიათ დაამატოთ ნავიგაციის ღილაკები */}
                    <div className="w-5 h-5 bg-gray-200 rounded-full" />
                    <div className="w-5 h-5 bg-gray-200 rounded-full" />
                  </div>
                </div>
                {/* კალენდრის გრიდი */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`
                        w-8 h-8 flex justify-center items-center rounded-sm cursor-pointer 
                        ${
                          day === 14
                            ? "bg-violet-600 text-white font-bold"
                            : "text-neutral-950 text-sm font-normal"
                        }
                      `}
                      onClick={() => {
                        setDeadline(`${day < 10 ? `0${day}` : day}/01/2025`);
                        setOpenDeadline(false);
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                {/* კალენდრის ფუთერი */}
                <div className="flex justify-between items-center px-4">
                  <button
                    type="button"
                    className="text-violet-600 text-xs font-normal font-['FiraGO']"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="text-violet-600 text-xs font-normal font-['FiraGO']"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ფორმის დასაბუთებელი ღილაკი */}
        <div className="absolute right-[368px] bottom-[226px]">
          <button
            type="submit"
            className="px-5 py-2.5 bg-violet-600 rounded-[5px] text-white text-lg font-normal font-['FiraGO']"
          >
            დავალების შექმნა
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
