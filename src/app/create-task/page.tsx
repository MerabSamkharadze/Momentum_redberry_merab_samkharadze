"use client";

import React, { useState, useEffect, Key } from "react";
import { departments } from "../../components/Sort";
import { statuses } from "@/components/StatusSelect";
import { priorities } from "../../components/Sort";
import Down from "../../../public/svg/Down";
import { redirect } from "next/navigation";

const TaskForm = () => {
  // ველის მონაცემები
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: any;
    avatar?: string;
    name?: string;
  }>({ id: null, avatar: "", name: "" });
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deadline, setDeadline] = useState("");

  // Dropdown -ის გახსნის მდგომარეობები
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [employees, setEmployees] = useState<
    {
      avatar: string;
      id: Key | null | undefined;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      title,
      description,
      selectedDepartment,
      selectedEmployee,
      selectedPriority,
      selectedStatus,
      deadline,
    });

    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
          },
          body: JSON.stringify({
            name: title,
            description,
            employee_id: selectedEmployee.id,
            priority_id: priorities.find((p) => p.name === selectedPriority)
              ?.id,
            status_id: statuses.find((s) => s.name === selectedStatus)?.id,
            due_date: deadline,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Network response was not ok: " + errorText);
      }

      await response.json();
    } catch (error) {
      console.error("Error submitting the employee data:", error);
    }
    redirect("/");
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
                      " text-neutral-600 text-sm font-normal font-['FiraGO']"
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
                      key={p.name}
                      className="p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedPriority(p.name);
                        setOpenPriority(false);
                      }}
                    >
                      <span
                        className={
                          "text-neutral-600 text-sm font-normal font-['FiraGO']"
                        }
                      >
                        {p.name}
                      </span>
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
                      key={status.id}
                      className="p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedStatus(status.name);
                        setOpenStatus(false);
                      }}
                    >
                      <span className="text-neutral-950 text-sm font-light font-['FiraGO']">
                        {status.name}
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
            <div className=" z-40">
              <div
                className="p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer "
                onClick={() => setOpenDepartment(!openDepartment)}
              >
                <span>{selectedDepartment || "დეპარტამენტი"}</span>
                <div className="w-3.5 h-3.5 relative">
                  <Down />
                </div>
              </div>
              {openDepartment && (
                <div className="mt-2 w-full bg-white rounded border border-violet-600 ">
                  {departments.map((dep) => (
                    <div
                      key={dep.id}
                      className="p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedDepartment(dep.name);
                        setOpenDepartment(false);
                      }}
                    >
                      <span>{dep.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* პასუხისმგებელი თანამშრომელი */}
          <div className="w-[550px] h-28 flex mt-7 flex-col z-20">
            <div className="py-1.5 flex justify-start items-center">
              <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                პასუხისმგებელი თანამშრომელი
              </label>
              <div className="w-2 h-2 -mt-5 relative ">*</div>
            </div>
            <div className="relative">
              <div
                className="p-3.5 bg-white rounded-[5px]  outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
                onClick={() => setOpenEmployee(!openEmployee)}
              >
                <span>
                  {selectedEmployee.avatar ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedEmployee.avatar}
                        alt={selectedEmployee.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{selectedEmployee.name}</span>
                    </div>
                  ) : (
                    "თანამშრომელი"
                  )}
                </span>
                <div className="w-3.5 h-3.5 relative">
                  <Down />
                </div>
              </div>
              {openEmployee && (
                <div className="mt-2 w-full bg-white rounded border border-violet-600">
                  {employees.map((emp) => (
                    <div
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setOpenEmployee(false);
                      }}
                      key={emp.id}
                      className="flex gap-2 items-center p-3.5 cursor-pointer hover:bg-gray-100"
                    >
                      {emp.avatar && (
                        <div className=" w-[50px] h-[50px] rounded-full overflow-hidden">
                          <img src={emp.avatar} alt={emp.name} />
                        </div>
                      )}
                      <span>{emp.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* დედლაინი */}
          <div className="w-80 flex flex-col mt-28 gap-1 ml-0.5">
            <div className="flex flex-col ">
              <label className="w-20 py-1.5 flex justify-center items-center text-neutral-700 text-base font-normal font-['FiraGO']">
                დედლაინი
              </label>
            </div>
            {/* real deadline */}
            <input
              type="date"
              onChange={(e) => setDeadline(e.target.value)}
              className="appearance-none border border-gray-400 p-2 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 w-80 flex flex-col gap-1 ml-0.5 uppercase justify-center "
            />
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
