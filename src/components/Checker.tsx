"use client";
import React, { useState, useEffect } from "react";

type CheckerProps = {
  items: { id: number; name: string; avatar?: string }[];
  initialSelected: number[];
  onSubmit: (selected: number[]) => void;
  onClose: () => void;
};

export default function Checker({
  items,
  initialSelected,
  onSubmit,
  onClose,
}: CheckerProps) {
  const [selected, setSelected] = useState<number[]>(initialSelected);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const handleCheckboxChange = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    onSubmit(selected);
  };

  return (
    <div className="w-[688px] px-7 pt-10 pb-5 bg-white rounded-[10px] absolute mt-28 outline outline-violet-600 flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div key={item.id}>
            <label
              htmlFor={item.id.toString()}
              className="flex items-center gap-3.5"
            >
              <input
                type="checkbox"
                name={item.name}
                id={item.id.toString()}
                checked={selected.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                className="w-5 h-5 rounded-md border border-neutral-800  "
              />
              <div className="flex gap-2 items-center">
                {item.avatar && (
                  <div className=" w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={item.avatar} alt={item.name} />
                  </div>
                )}
                <span>{item.name}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-violet-600 text-white rounded-[20px]"
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}
