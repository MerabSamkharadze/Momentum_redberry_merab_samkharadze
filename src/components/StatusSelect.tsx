"use client";

import React, { useState } from "react";
import Down from "../../public/svg/Down";

export const statuses = [
  { id: 1, name: "დასაწყები" },
  { id: 2, name: "პროგრესში" },
  { id: 3, name: "მზად ტესტირებისთვის" },
  { id: 4, name: "დასრულებული" },
];

type Status = {
  id: number;
  name: string;
};

interface StatusSelectProps {
  initialStatus: Status;
  id: string;
}

export default function StatusSelect({ initialStatus, id }: StatusSelectProps) {
  const [selectedStatus, setSelectedStatus] = useState<Status>(initialStatus);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = async (status: Status) => {
    try {
      const res = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
          },
          body: JSON.stringify({ status_id: status.id }),
        }
      );

      if (!res.ok) {
        throw new Error("სტატუსის განახლება ვერ მოხერხდა");
      }

      setSelectedStatus(status);
      setIsOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="relative inline-block text-left w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 bg-white border border-gray-300 rounded-md flex justify-between items-center text-sm font-light text-neutral-950"
      >
        {selectedStatus.name}
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <div className="w-3.5 h-3.5">
            <Down />
          </div>
        </span>
      </button>

      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
          {statuses.map((status) => (
            <div
              key={status.id}
              onClick={() => handleChange(status)}
              className={`p-3 cursor-pointer hover:bg-violet-100 ${
                selectedStatus.id === status.id ? "bg-violet-100" : ""
              }`}
            >
              {status.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
