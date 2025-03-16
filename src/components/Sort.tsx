"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Down from "../../public/svg/Down";
import Checker from "./Checker";

type ButtonGroup = "departments" | "priorities" | "employees";
export const departments = [
  { id: 1, name: "ადმინისტრაციის დეპარტამენტი" },
  { id: 2, name: "ადამიანური რესურსების დეპარტამენტი" },
  { id: 3, name: "ფინანსების დეპარტამენტი" },
  { id: 4, name: "გაყიდვები და მარკეტინგის დეპარტამენტი" },
  { id: 5, name: "ლოჯისტიკის დეპარტამენტი" },
  { id: 6, name: "ტექნოლოგიების დეპარტამენტი" },
  { id: 7, name: "მედიის დეპარტამენტი" },
];
export const priorities = [
  { id: 1, name: "დაბალი" },
  { id: 2, name: "საშუალო" },
  { id: 3, name: "მაღალი" },
];
export default function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [employees, setEmployees] = useState([]);

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
      // თუ უკვე აქტიურია, მაშინ ვხურავთ
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
            <span className="w-6 h-6">
              <Down
                className={
                  activeButton === "departments"
                    ? "fill-[#8338ec]"
                    : "fill-[#0d0e10]"
                }
              />
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
            <span className="w-6 h-6">
              <Down
                className={
                  activeButton === "priorities"
                    ? "fill-[#8338ec]"
                    : "fill-[#0d0e10]"
                }
              />
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
            <span className="w-6 h-6">
              <Down
                className={
                  activeButton === "employees"
                    ? "fill-[#8338ec]"
                    : "fill-[#0d0e10]"
                }
              />
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

      {selectedOptions.departments.length > 0 ||
      selectedOptions.priorities.length > 0 ? (
        <div className="mt-10">
          <div className="flex gap-2 p-4 bg-gray-100 rounded">
            <div>
              {departments
                .filter((dept) => selectedOptions.departments.includes(dept.id))
                .map((dept) => dept.name)
                .join(", ")}
            </div>
            <div className="flex gap-2">
              {priorities
                .filter((item) => selectedOptions.priorities.includes(item.id))
                .map((item) => item.name)
                .join(", ")}
              <button onClick={handleClear} className="hover:scale-110 rounded">
                გასუფთავება
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
