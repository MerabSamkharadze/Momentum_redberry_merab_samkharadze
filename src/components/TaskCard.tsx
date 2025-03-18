"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import Link from "next/link";

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
  total_comments?: number;
};

type TaskCardProps = {
  task: Task;
  column_name: string;
};

export default function TaskCard({ task, column_name }: TaskCardProps) {
  const formattedDate = dayjs(task.due_date).locale("ka").format("D MMMM YYYY");

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
  const backgroundColors = ["#FF66A8", "#FD9A6D", "#89B6FF", "#FFD86D"];
  const [randomBgColor, setRandomBgColor] = useState<string>("");

  useEffect(() => {
    const randomColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    setRandomBgColor(randomColor);
  }, []);

  return (
    <Link
      href={`/tasks/${task.id}`}
      className={`p-5 bg-white rounded-[15px] border  shadow-sm flex flex-col gap-7 w-[381px] ${
        column_name === "დასაწყები"
          ? "border-[#FFC107]"
          : column_name === "პროგრესიში"
          ? "border-[#FB5607]"
          : column_name === "მზად ტესტირებისთვის"
          ? "border-[#FF006E]"
          : "border-[#3A86FF]"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex items-center gap-1 px-2 py-1  rounded-md outline-[0.50px] outline-offset-[-0.50px] ${
              task.priority.id === 1
                ? "outline-green-700"
                : task.priority.id === 2
                ? "outline-yellow-400"
                : "outline-red-500"
            }`}
          >
            <img
              src={task.priority.icon}
              alt={task.priority.name}
              className="w-4 h-4"
            />
            <span
              className={`text-xs ${
                task.priority.id === 1
                  ? "text-green-700"
                  : task.priority.id === 2
                  ? "text-yellow-400"
                  : "text-red-500"
              }`}
            >
              {task.priority.name}
            </span>
          </div>

          <div
            style={{ backgroundColor: randomBgColor }}
            className=" px-[9px] py-[5px] rounded-[15px] flex justify-center items-center"
          >
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
          <span>
            <img src="/Comments.svg" alt="comments-icon" />
          </span>
          <span>{task.total_comments}</span>
        </div>
      </div>
    </Link>
  );
}
