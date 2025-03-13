"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sort from "@/components/Sort";
import Sveti from "@/components/Sveti";
import { Task } from "@/components/TaskCard";

export default function Home() {
  const searchParams = useSearchParams();
  const [statuses, setStatuses] = useState<
    { id: number; name: string; tasks: Task[] }[]
  >([]);

  const priority = searchParams.get("priority");
  const department = searchParams.get("department");
  const employee = searchParams.get("employee");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const queryParams = new URLSearchParams();
        if (priority) queryParams.append("priority", priority);
        if (department) queryParams.append("department", department);
        if (employee) queryParams.append("employee", employee);

        const res = await fetch(
          `http://localhost:3000/api/tasks?${queryParams.toString()}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, [priority, department, employee]); // Dependencies for re-fetching data

  // Group tasks by status
  const start_tasks = statuses.find((s) => s.id === 1)?.tasks || [];
  const progress_tasks = statuses.find((s) => s.id === 2)?.tasks || [];
  const doneForTest_tasks = statuses.find((s) => s.id === 3)?.tasks || [];
  const done_tasks = statuses.find((s) => s.id === 4)?.tasks || [];

  return (
    <main className="w-[1920px] px-[120px] py-[30px] bg-white">
      <div className="text-[#212529] text-[34px] font-semibold font-sans">
        დავალებების გვერდი
      </div>
      <Sort />
      <div className="grid grid-cols-4 gap-10 mt-20">
        <Sveti tasks={start_tasks} column_name="დასაწყები" />
        <Sveti tasks={progress_tasks} column_name="პროგრესში" />
        <Sveti tasks={doneForTest_tasks} column_name="მზად ტესტირებისთვის" />
        <Sveti tasks={done_tasks} column_name="დასრულებული" />
      </div>
    </main>
  );
}
