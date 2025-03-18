import React, { useState, useEffect } from "react";
import Down from "../../public/svg/Down";
import EmployeeModal from "./EmployeeModal";

type Department = {
  id: string;
  name: string;
};

type Employee = {
  id: string;
  name: string;
  avatar?: string;
};

const MyTaskForm = () => {
  // --- დროპდაუნების სამართავი სტეიტები ---
  const [openDepartment, setOpenDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [openEmployee, setOpenEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
    id: "",
    name: "",
    avatar: "",
  });

  // --- დედლაინი ---
  const [deadline, setDeadline] = useState("");

  // --- მონაცემები API-დან ---
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // --- მოდალი თანამშრომლის დასამატებლად ---
  const [isOpen, setIsOpen] = useState(false);

  // --- შეცდომების ობიექტი (ზოგადი მაგალითია) ---
  const [errors, setErrors] = useState<{
    department?: string;
    employee?: string;
    deadline?: string;
  }>({});

  // დედლაინის მინიმალური მნიშვნელობა (მაგ. ხვალინდელი დღე)
  const formattedTomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  // დეპარტამენტების წამოღება
  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error(err));
  }, []);

  // თანამშრომლების წამოღება (მაგალითად)
  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  // შეგიძლიათ შეამოკლოთ ან შეცვალოთ ლოგიკა
  const filteredEmployees = employees; // თუ გჭირდებათ, დაამატეთ ძიება/ფილტრი

  // მარტივი ვალიდაცია submit-ისას
  const handleSubmit = () => {
    const newErrors: any = {};

    if (!selectedDepartment) {
      newErrors.department = "დეპარტამენტი სავალდებულოა";
    }
    if (!selectedEmployee || !selectedEmployee.id) {
      newErrors.employee = "თანამშრომელი სავალდებულოა";
    }
    if (!deadline) {
      newErrors.deadline = "დედლაინი სავალდებულოა";
    }

    setErrors(newErrors);

    // თუ შეცდომა არ არის, გავაგზავნოთ მონაცემები
    if (Object.keys(newErrors).length === 0) {
      console.log("გაგზავნა:", {
        department: selectedDepartment,
        employee: selectedEmployee,
        deadline,
      });
      // აქ განახორციელეთ API call ან სხვა ლოგიკა
    }
  };

  return (
    <div className="absolute left-[766px] top-[105px] w-[550px] flex flex-col gap-6">
      {/* --- დეპარტამენტი --- */}
      <div className="h-28 flex flex-col">
        <div className="py-1.5 flex items-center">
          <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
            დეპარტამენტი
          </label>
          <span className="ml-1">*</span>
        </div>
        <div className="z-40">
          <div
            className="p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
            onClick={() => setOpenDepartment(!openDepartment)}
          >
            <span>{selectedDepartment || "დეპარტამენტი"}</span>
            <span
              className={`transform transition-transform ${
                openDepartment ? "rotate-180" : "rotate-0"
              }`}
            >
              <div className="w-3.5 h-3.5">
                <Down />
              </div>
            </span>
          </div>
          {openDepartment && (
            <div className="mt-2 w-full bg-white rounded border border-violet-600">
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
        {errors.department && (
          <span className="text-[10px] font-['FiraGO'] text-[#FA4D4D]">
            {errors.department}
          </span>
        )}
      </div>

      {/* --- პასუხისმგებელი თანამშრომელი --- */}
      <div className="w-[550px] h-28 flex mt-7 flex-col z-20">
        <div className="py-1.5 flex items-center">
          <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
            პასუხისმგებელი თანამშრომელი
          </label>
          <span className="ml-1">*</span>
        </div>
        <div className="relative">
          <div
            className="p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
            onClick={() => setOpenEmployee(!openEmployee)}
          >
            <span>
              {selectedEmployee.id ? (
                <div className="flex items-center gap-2">
                  {selectedEmployee.avatar && (
                    <img
                      src={selectedEmployee.avatar}
                      alt={selectedEmployee.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{selectedEmployee.name}</span>
                </div>
              ) : (
                "თანამშრომელი"
              )}
            </span>
            <span
              className={`transform transition-transform ${
                openEmployee ? "rotate-180" : "rotate-0"
              }`}
            >
              <div className="w-3.5 h-3.5">
                <Down />
              </div>
            </span>
          </div>
          {openEmployee && (
            <div className="mt-2 w-full bg-white rounded border border-violet-600">
              {/* „თანამშრომლის დამატება“ ღილაკი */}
              <div
                onClick={() => {
                  setIsOpen(true); // გახსნას EmployeeModal
                }}
                className="w-full h-12 px-3 py-3 bg-white hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              >
                <div className="w-4 h-4 p-2.5 rounded-[30px] outline-[1.50px] outline-offset-[-1.50px] outline-violet-600 flex items-center justify-center">
                  <div className="text-violet-600 text-2xl font-light font-sans">
                    +
                  </div>
                </div>
                <div className="text-violet-600 text-base font-normal font-['FiraGO']">
                  დაამატე თანამშრომელი
                </div>
              </div>

              {/* ჩამონათვალში არსებული თანამშრომლები */}
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
            <span className="text-[10px] font-['FiraGO'] text-[#FA4D4D]">
              {errors.employee}
            </span>
          )}
        </div>
      </div>

      {/* --- დედლაინი --- */}
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
          className="appearance-none p-2 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 w-80 ml-0.5 uppercase"
        />
        {errors.deadline && (
          <span className="text-[10px] font-['FiraGO'] text-[#FA4D4D]">
            {errors.deadline}
          </span>
        )}
      </div>

      {/* --- შენახვის ღილაკი --- */}
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 bg-violet-600 rounded-md text-white hover:bg-violet-700"
        >
          შენახვა
        </button>
      </div>

      {/* თანამშრომლის დამატების მოდალი */}
      {isOpen && (
        <EmployeeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          refetchEmployees={() => {
            // ახალი თანამშრომლის დამატების შემდეგ, შეგიძლიათ გადაამოწმოთ ან განაახლოთ employees
          }}
        />
      )}
    </div>
  );
};

export default MyTaskForm;
