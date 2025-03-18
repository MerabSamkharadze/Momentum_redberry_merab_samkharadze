"use client";
import React, { useState } from "react";
import EmployeeModal from "./EmployeeModal";

export default function AddEmploy({
  fetchEmployees,
}: {
  fetchEmployees: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="px-5 py-2.5  bg-white rounded-[5px]  outline-1 outline-offset-[-1px] outline-violet-600 hover:outline-[#B588F4] inline-flex justify-center items-center cursor-pointer gap-2.5">
        <button
          className="justify-start w-full h-full cursor-pointer text-neutral-800 text-base font-normal font-['FiraGO']"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          თანამშრომლის დამატება
        </button>
      </div>

      <EmployeeModal
        refetchEmployees={fetchEmployees}
        isOpen={isOpen}
        onClose={function (): void {
          setIsOpen(false);
        }}
      />
    </>
  );
}

{
}
