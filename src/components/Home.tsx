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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const priority = searchParams.get("priority");
  const department = searchParams.get("department");
  const employee = searchParams.get("employee");

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (priority) queryParams.append("priority", priority);
        if (department) queryParams.append("department", department);
        if (employee) queryParams.append("employee", employee);

        const res = await fetch(`/api/tasks?${queryParams.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [priority, department, employee]);

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
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-10 mt-10">
          <Sveti tasks={start_tasks} column_name="დასაწყები" />
          <Sveti tasks={progress_tasks} column_name="პროგრესში" />
          <Sveti tasks={doneForTest_tasks} column_name="მზად ტესტირებისთვის" />
          <Sveti tasks={done_tasks} column_name="დასრულებული" />
        </div>
      )}
    </main>
  );
}
