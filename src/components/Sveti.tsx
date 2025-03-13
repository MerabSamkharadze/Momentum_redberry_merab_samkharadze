import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "./TaskCard";

interface SvetiProps {
  column_name: string;
  tasks: Task[];
}

export default function Sveti({ column_name, tasks }: SvetiProps) {
  return (
    <div className="rounded-[10px] inline-flex flex-col justify-start items-center gap-7">
      <div
        className={`self-stretch py-3.5 rounded-[10px] flex flex-col justify-start items-center gap-2.5 ${
          column_name === "დასაწყები"
            ? "bg-[#FFC107]"
            : column_name === "პროგრესში"
            ? "bg-[#FB5607]"
            : column_name === "მზად ტესტირებისთვის"
            ? "bg-[#FF006E]"
            : "bg-[#3A86FF]"
        }`}
      >
        <div className="justify-start text-white text-xl font-medium font-['FiraGO']">
          {column_name}
        </div>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} column_name={column_name} />
      ))}
    </div>
  );
}
