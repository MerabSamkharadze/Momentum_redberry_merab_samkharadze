import React from "react";

export type Department = {
  id: number;
  name: string;
};

export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
};

export type Status = {
  id: number;
  name: string;
};

export type Priority = {
  id: number;
  name: string;
  icon: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
  total_comments: number;
};

export type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const formattedDate = new Date(task.due_date).toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getDepartmentName = (name: string) => {
    const departmentMap: Record<string, string> = {
      "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
      "ადამიანური რესურსების დეპარტამენტი": "HR",
      "ფინანსების დეპარტამენტი": "ფინანსები",
      "გაყიდვები და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
      "ლოჯოსტიკის დეპარტამენტი": "ლოჯისტიკა",
      "ტექნოლოგიების დეპარტამენტი": "ტექნოლოგიები",
      "მედიის დეპარტამენტი": "მედია",
    };

    return departmentMap[name] || name;
  };

  return (
    <div className="p-5 bg-white rounded-[15px] border border-gray-200 shadow-sm flex flex-col gap-7 w-[381px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 px-2 py-1 border rounded-md">
            <img
              src={task.priority.icon}
              alt={task.priority.name}
              className="w-4 h-4"
            />
            <span className="text-xs text-gray-700">{task.priority.name}</span>
          </div>

          <div className=" px-[9px] py-[5px] bg-[#ff66a8] rounded-[15px] flex justify-center items-center">
            <span className="text-white text-xs font-normal">
              {getDepartmentName(task.department.name)}
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-600">{formattedDate}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">{task.name}</h3>
        <p className="text-sm text-gray-700">{task.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <img
          src={task.employee.avatar}
          alt={`${task.employee.name} ${task.employee.surname}`}
          className="w-8 h-8 rounded-full "
        />
        <div className="flex items-center gap-1 text-gray-700 text-sm">
          <span>💬</span>
          <span>{task.total_comments}</span>
        </div>
      </div>
    </div>
  );
}
