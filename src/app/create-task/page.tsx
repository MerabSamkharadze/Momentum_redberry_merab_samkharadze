"use client";

import React, { useState, useEffect, Key } from "react";
import { departments } from "../../components/Sort";
import { fetchPriorities } from "@/actions";
import { fetchStatuses } from "@/actions";
import Down from "../../../public/svg/Down";
import { useRouter } from "next/navigation";
import EmployeeModal from "@/components/EmployeeModal";
import { Department, Priority } from "@/components/TaskCard";
import { Status } from "@/components/TaskCard";
import { useEmployeeContext } from "@/context/EmployeeContext";
import AddEmploy from "@/components/AddEmploy";

const priorities = await fetchPriorities();
const statuses = await fetchStatuses();

const TaskForm = () => {
  const router = useRouter();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const formattedTomorrow = tomorrowDate.toISOString().split("T")[0];
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: any;
    avatar?: string;
    name?: string;
    department?: { name: string; id: number };
  }>({ id: null, avatar: "", name: "", department: { name: "", id: 0 } });

  const [selectedPriority, setSelectedPriority] = useState<{
    icon: string;
    id: number;
    name: string;
  }>(priorities[0]);
  const [selectedStatus, setSelectedStatus] = useState("დასაწყები");
  const [deadline, setDeadline] = useState(formattedTomorrow);

  const [openDepartment, setOpenDepartment] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    department: "",
    employee: "",
    deadline: "",
  });

  const { employees, loading, error, refetch } = useEmployeeContext();

  const validateFields = () => {
    let tempErrors = {
      title: "",
      description: "",
      department: "",
      employee: "",
      deadline: "",
    };

    if (!title.trim()) {
      tempErrors.title = "სავალდებულო";
    } else if (title.trim().length < 3) {
      tempErrors.title = "მინიმუმ 3 სიმბოლო";
    } else if (title.trim().length > 255) {
      tempErrors.title = "მაქსიმუმ 255 სიმბოლო";
    }

    if (description.trim()) {
      if (description.trim().split(/\s+/).length < 4) {
        tempErrors.description = "მინიმუმ 4 სიტყვა";
      }
      if (description.trim().length > 255) {
        tempErrors.description = "მაქსიმუმ 255 სიმბოლო";
      }
    }

    if (!selectedDepartment) {
      tempErrors.department = "სავალდებულო";
    }

    if (selectedDepartment && !selectedEmployee.id) {
      tempErrors.employee = "სავალდებულო";
    }

    if (!deadline) {
      tempErrors.deadline = "სავალდებულო";
    } else {
      const selDate = new Date(deadline);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 1);
      selDate.setHours(0, 0, 0, 0);
      minDate.setHours(0, 0, 0, 0);
      if (selDate < minDate) {
        tempErrors.deadline = "გთხოვთ აირჩიეთ მომავალ თარიღი";
      }
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((msg) => msg === "");
  };

  useEffect(() => {
    validateFields();
  }, [title, description, selectedDepartment, selectedEmployee, deadline]);

  const filteredEmployees = selectedDepartment
    ? employees.filter((emp) => emp.department.name === selectedDepartment)
    : [];

  useEffect(() => {
    if (selectedEmployee.id) {
      const exists = filteredEmployees.some(
        (emp) => emp.id === selectedEmployee.id
      );
      if (!exists) {
        setSelectedEmployee({
          id: null,
          avatar: "",
          name: "",
          department: { name: "", id: 0 },
        });
      }
    }
  }, [selectedDepartment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) return;

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
            priority_id: selectedPriority.id,
            status_id: statuses.find((s: Status) => s.name === selectedStatus)
              ?.id,
            due_date: deadline,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Network response was not ok: " + errorText);
      }

      await response.json();

      router.push("/");
    } catch (error) {
      console.error("Error submitting the employee data:", error);
    }
  };

  return (
    <div className="ml-[88px] p-8">
      <div className="w-[1684px] text-neutral-800 text-4xl font-semibold font-sans mb-6">
        შექმენი ახალი დავალება
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[1684px] h-[958px] relative bg-purple-50/60 rounded outline-[0.30px] outline-offset-[-0.30px] outline-violet-200 p-10"
      >
        <div className="w-[550px] ml-[55px] mt-[65px] flex flex-col gap-14">
          <div className="h-28 flex flex-col">
            <div className="py-1.5 flex items-start">
              <label className="text-neutral-700 text-base font-normal font-sans">
                სათაური
              </label>
              <span className="ml-1 ">*</span>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="სათაური"
                className={`w-[550px] p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 `}
              />
              {errors.title && (
                <span
                  className="text-[10px] font-['FiraGO']"
                  style={{ color: "#FA4D4D" }}
                >
                  {errors.title}
                </span>
              )}
            </div>
          </div>

          <div className="w-[550px] h-48 flex flex-col">
            <div className="py-1.5 flex items-start">
              <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                აღწერა
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="აღწერა"
                className={`w-[550px] h-32 p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 `}
              />
              {errors.description && (
                <span
                  className="text-[10px] font-['FiraGO']"
                  style={{ color: "#FA4D4D" }}
                >
                  {errors.description}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-8">
            <div className="h-64 flex flex-col">
              <div className="py-1.5 flex items-center">
                <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                  პრიორიტეტი
                </label>
                <span className="ml-1 ">*</span>
              </div>
              <div
                className="w-64 h-11 p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
                onClick={() => setOpenPriority(!openPriority)}
              >
                <span className="text-neutral-600 text-sm font-normal font-['FiraGO']">
                  {selectedPriority.icon && (
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedPriority.icon}
                        alt={selectedPriority.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{selectedPriority.name}</span>
                    </div>
                  )}
                </span>
                <div className="w-3.5 h-3.5">
                  <Down />
                </div>
              </div>
              {openPriority && (
                <div className="mt-2 w-64 bg-white rounded border border-violet-600">
                  {priorities.map((p: Priority) => (
                    <div
                      key={p.name}
                      className="flex gap-2 items-center p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedPriority(p);
                        setOpenPriority(false);
                      }}
                    >
                      {p.icon && (
                        <div className="w-4 h-4 relative overflow-hidden">
                          <img src={p.icon} alt={p.name} />
                        </div>
                      )}
                      <span className="text-neutral-600 text-sm font-normal font-['FiraGO']">
                        {p.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="h-20 flex flex-col">
              <div className="py-1.5 flex items-center">
                <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                  სტატუსი
                </label>
                <span className="ml-1 ">*</span>
              </div>
              <div
                className="w-64 p-3.5 bg-white rounded-[5px] outline-1 outline-gray-300 flex items-center gap-2.5 cursor-pointer"
                onClick={() => setOpenStatus(!openStatus)}
              >
                <span className="flex-1 text-neutral-950 text-sm font-light font-['FiraGO']">
                  {selectedStatus}
                </span>
                <div className="w-3.5 h-3.5">
                  <Down />
                </div>
              </div>
              {openStatus && (
                <div className="mt-2 w-64 rounded border border-violet-600">
                  {statuses.map((status: Status) => (
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

        <div className="absolute left-[766px] top-[105px] w-[550px] flex flex-col gap-6">
          <div className="h-28 flex flex-col">
            <div className="py-1.5 flex items-center">
              <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                დეპარტამენტი
              </label>
              <span className="ml-1 ">*</span>
            </div>
            <div className="z-40">
              <div
                className="p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
                onClick={() => setOpenDepartment(!openDepartment)}
              >
                <span>{selectedDepartment || "დეპარტამენტი"}</span>
                <div className="w-3.5 h-3.5">
                  <Down />
                </div>
              </div>
              {openDepartment && (
                <div className="mt-2 w-full bg-white rounded border border-violet-600">
                  {departments.map((dep: Department) => (
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

          <div className="w-[550px] h-28 flex mt-7 flex-col z-20">
            <div className="py-1.5 flex items-center">
              <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                პასუხისმგებელი თანამშრომელი
              </label>
              <span className="ml-1 ">*</span>
            </div>
            <div className="relative">
              <div
                className="p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
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
                <div className="w-3.5 h-3.5">
                  <Down />
                </div>
              </div>
              {openEmployee && (
                <div className="mt-2 w-full bg-white rounded border border-violet-600">
                  <div
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className="self-stretch w-full p-6 overflow-hidden cursor-pointer  h-12 px-3 py-3 bg-white hover:bg-gray-100 inline-flex justify-start items-center gap-1.5"
                  >
                    <div className="flex  justify-start items-center gap-2">
                      <div className="w-4 h-4 p-2.5  rounded-[30px]  outline-[1.50px] outline-offset-[-1.50px] outline-violet-600 inline-flex flex-col justify-center items-center gap-2.5">
                        <div className="justify-start text-violet-600 text-2xl font-light font-sans ">
                          +
                        </div>
                      </div>
                      <div className="justify-start text-violet-600 text-base font-normal font-['FiraGO']">
                        დაამატე თანამშრომელი
                      </div>
                    </div>
                  </div>
                  {filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      className="flex gap-2 items-center p-3.5 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setOpenEmployee(false);
                      }}
                    >
                      {emp.avatar && (
                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                          <img src={emp.avatar} alt={emp.name} />
                        </div>
                      )}
                      <span>{emp.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {errors.employee && (
                <span
                  className="text-[10px] font-['FiraGO']"
                  style={{ color: "#FA4D4D" }}
                >
                  {errors.employee}
                </span>
              )}
            </div>
          </div>

          <div className="w-80 flex flex-col mt-28 gap-1 ml-0.5">
            <div className="flex flex-col">
              <label className="w-20 py-1.5 flex justify-center items-center text-neutral-700 text-base font-normal font-['FiraGO']">
                დედლაინი
              </label>
            </div>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={formattedTomorrow}
              className={`appearance-none p-2 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 w-80 ml-0.5 uppercase `}
            />
            {errors.deadline && (
              <span
                className="text-[10px] font-['FiraGO']"
                style={{ color: "#FA4D4D" }}
              >
                {errors.deadline}
              </span>
            )}
          </div>
        </div>

        <div className="absolute right-[368px] bottom-[226px]">
          <button
            type="submit"
            disabled={
              !title ||
              !selectedDepartment ||
              !selectedEmployee.id ||
              !deadline ||
              Object.values(errors).some((msg) => msg !== "")
            }
            className={`px-5 py-2.5 bg-[#8338EC] rounded-[5px] text-white text-lg font-normal font-['FiraGO'] ${
              !title ||
              !selectedDepartment ||
              !selectedEmployee.id ||
              !deadline ||
              Object.values(errors).some((msg) => msg !== "")
                ? " cursor-not-allowed"
                : ""
            }`}
          >
            დავალების შექმნა
          </button>
        </div>
      </form>
      <EmployeeModal
        refetchEmployees={refetch}
        isOpen={isOpen}
        onClose={function (): void {
          setIsOpen(false);
        }}
      />
      <AddEmploy fetchEmployees={refetch} />
    </div>
  );
};

export default TaskForm;
