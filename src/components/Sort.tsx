"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Down from "../../public/svg/Down";
import Checker from "./Checker";
import { fetchPriorities } from "@/actions";
import { fetchDepartments } from "@/actions";
import { Department } from "./TaskCard";
import { useEmployeeContext } from "@/context/EmployeeContext";

type ButtonGroup = "departments" | "priorities" | "employees";
export type Priority = { id: number; name: string; icon: string };
export const departments = await fetchDepartments();
const priorities = await fetchPriorities();

export default function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { employees, loading, error, refetch } = useEmployeeContext();

  const initialDepartments = searchParams.get("department")
    ? searchParams.get("department")!.split(",").map(Number)
    : [];
  const initialPriorities = searchParams.get("priority")
    ? searchParams.get("priority")!.split(",").map(Number)
    : [];
  const initialEmployees = searchParams.get("employee")
    ? searchParams.get("employee")!.split(",").map(Number)
    : [];

  const [selectedOptions, setSelectedOptions] = useState<{
    departments: number[];
    priorities: number[];
    employee: number[];
  }>({
    departments: initialDepartments,
    priorities: initialPriorities,
    employee: initialEmployees,
  });

  const [activeButton, setActiveButton] = useState<ButtonGroup | null>(null);
  const [activeGroup, setActiveGroup] = useState<
    "departments" | "priorities" | "employee" | null
  >(null);
  const [currentItems, setCurrentItems] = useState<
    { id: number; name: string; avatar?: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (group: ButtonGroup) => {
    if (activeButton === group) {
      setActiveButton(null);
      setActiveGroup(null);
      setIsOpen(false);
    } else {
      setActiveButton(group);
      if (group === "departments") {
        setActiveGroup("departments");
        setCurrentItems(departments);
      } else if (group === "priorities") {
        setActiveGroup("priorities");
        setCurrentItems(priorities);
      } else if (group === "employees") {
        setActiveGroup("employee");
        setCurrentItems(employees);
      }
      setIsOpen(true);
    }
  };

  const handleSelection = (selected: number[]) => {
    if (activeGroup) {
      setSelectedOptions((prev) => ({
        ...prev,
        [activeGroup]: selected,
      }));
    }
    setIsOpen(false);
    setActiveGroup(null);
  };

  const handleClear = () => {
    setSelectedOptions({ departments: [], priorities: [], employee: [] });
    setActiveButton(null);
    setActiveGroup(null);
    setIsOpen(false);
  };

  // ინდივიდუალური წაშლის ფუნქციები
  const handleRemoveDepartment = (id: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      departments: prev.departments.filter((depId) => depId !== id),
    }));
  };

  const handleRemovePriority = (id: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      priorities: prev.priorities.filter((pId) => pId !== id),
    }));
  };

  const handleRemoveEmployee = (id: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      employee: prev.employee.filter((empId) => empId !== id),
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedOptions.departments.length > 0) {
      params.set("department", selectedOptions.departments.join(","));
    }
    if (selectedOptions.priorities.length > 0) {
      params.set("priority", selectedOptions.priorities.join(","));
    }
    if (selectedOptions.employee.length > 0) {
      params.set("employee", selectedOptions.employee.join(","));
    }

    router.replace(`?${params.toString()}`);
  }, [selectedOptions, router]);

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-[10px] w-[700px] mt-14 outline outline-[#dee2e6] inline-flex gap-10">
        <div className="w-[199px] h-11 relative rounded-[5px]">
          <button
            onClick={() => handleButtonClick("departments")}
            className="w-[199px] h-11 px-[18px] py-2.5 absolute bg-white rounded-[10px] inline-flex justify-between items-center"
          >
            <div
              className={`text-base ${
                activeButton === "departments"
                  ? "text-[#8338ec]"
                  : "text-[#0d0e10]"
              }`}
            >
              დეპარტამენტი
            </div>
            <span
              className={`transform transition-transform ${
                activeButton === "departments" ? "rotate-180" : "rotate-0"
              }`}
            >
              <div className="w-3.5 h-3.5">
                <Down
                  className={
                    activeButton === "departments"
                      ? "fill-[#8338ec]"
                      : "fill-[#0d0e10]"
                  }
                />
              </div>
            </span>
          </button>
        </div>

        <div className="w-[199px] h-11 relative">
          <button
            onClick={() => handleButtonClick("priorities")}
            className="w-[199px] h-11 px-[18px] py-2.5 absolute bg-white rounded-[10px] inline-flex justify-between items-center"
          >
            <div
              className={`text-base ${
                activeButton === "priorities"
                  ? "text-[#8338ec]"
                  : "text-[#0d0e10]"
              }`}
            >
              პრიორიტეტი
            </div>
            <span
              className={`transform transition-transform ${
                activeButton === "priorities" ? "rotate-180" : "rotate-0"
              }`}
            >
              <div className="w-3.5 h-3.5">
                <Down
                  className={
                    activeButton === "priorities"
                      ? "fill-[#8338ec]"
                      : "fill-[#0d0e10]"
                  }
                />
              </div>
            </span>
          </button>
        </div>
        <div className="w-[199px] h-11 relative">
          <button
            onClick={() => handleButtonClick("employees")}
            className="w-[199px] h-11 px-[18px] py-2.5 absolute bg-white rounded-[10px] inline-flex justify-between items-center"
          >
            <div
              className={`text-base ${
                activeButton === "employees"
                  ? "text-[#8338ec]"
                  : "text-[#0d0e10]"
              }`}
            >
              თანამშრომელი
            </div>
            <span
              className={`transform transition-transform ${
                activeButton === "employees" ? "rotate-180" : "rotate-0"
              }`}
            >
              <div className="w-3.5 h-3.5">
                <Down
                  className={
                    activeButton === "employees"
                      ? "fill-[#8338ec]"
                      : "fill-[#0d0e10]"
                  }
                />
              </div>
            </span>
          </button>
        </div>
      </div>

      {isOpen && activeGroup && (
        <Checker
          items={currentItems}
          initialSelected={selectedOptions[activeGroup]}
          onSubmit={handleSelection}
          onClose={() => {
            setIsOpen(false);
            setActiveGroup(null);
            setActiveButton(null);
          }}
        />
      )}

      {(selectedOptions.departments.length > 0 ||
        selectedOptions.priorities.length > 0 ||
        selectedOptions.employee.length > 0) && (
        <div className="mt-10">
          <div className="flex flex-wrap gap-2 p-4 rounded">
            {selectedOptions.departments.length > 0 &&
              departments
                .filter((dept: Department) =>
                  selectedOptions.departments.includes(dept.id)
                )
                .map((dept: Department) => (
                  <div
                    key={dept.id}
                    className="cursor-pointer px-2.5 py-1.5 bg-white rounded-[43px] outline outline-gray-300 inline-flex items-center gap-1"
                    onClick={() => handleRemoveDepartment(dept.id)}
                  >
                    <div className="text-center text-neutral-700 text-sm font-normal font-['FiraGO']">
                      {dept.name}
                    </div>
                    <div className="w-3.5 h-3.5 relative overflow-hidden">
                      <img src="/x.svg" alt="remove" />
                    </div>
                  </div>
                ))}

            {selectedOptions.priorities.length > 0 &&
              priorities
                .filter((item: Priority) =>
                  selectedOptions.priorities.includes(item.id)
                )
                .map((item: Priority) => (
                  <div
                    key={item.id}
                    className="cursor-pointer px-2.5 py-1.5 bg-white rounded-[43px] outline outline-gray-300 inline-flex items-center gap-1"
                    onClick={() => handleRemovePriority(item.id)}
                  >
                    <div className="text-center text-neutral-700 text-sm font-normal font-['FiraGO']">
                      {item.name}
                    </div>
                    <div className="w-3.5 h-3.5 relative overflow-hidden">
                      <img src="/x.svg" alt="remove" />
                    </div>
                  </div>
                ))}

            {/* არჩეული თანამშრომლები */}
            {selectedOptions.employee.length > 0 &&
              employees
                .filter((emp: any) => selectedOptions.employee.includes(emp.id))
                .map((emp: any) => (
                  <div
                    key={emp.id}
                    onClick={() => handleRemoveEmployee(emp.id)}
                    className="cursor-pointer px-2.5 py-1.5 bg-white rounded-[43px] outline outline-gray-300 inline-flex items-center gap-1"
                  >
                    <div className="text-center text-neutral-700 text-sm font-normal font-['FiraGO']">
                      {emp.name}
                    </div>
                    <div className="w-3.5 h-3.5 relative z-0 overflow-hidden">
                      <img src="/x.svg" alt="remove" />
                    </div>
                  </div>
                ))}

            <button
              onClick={handleClear}
              className="hover:scale-105 rounded ml-2 text-neutral-500 transition-all cursor-pointer"
            >
              გასუფთავება
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
