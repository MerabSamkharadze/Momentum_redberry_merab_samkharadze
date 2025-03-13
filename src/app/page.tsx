import Sort from "@/components/Sort";
import Sveti from "@/components/Sveti";
import { Task } from "@/components/TaskCard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const statuses = await res.json();

  const start_tasks: Task[] =
    statuses.find((status: any) => status.id === 1)?.tasks || [];

  const progress_tasks: Task[] =
    statuses.find((status: any) => status.id === 2)?.tasks || [];
  const doneForTest_tasks: Task[] =
    statuses.find((status: any) => status.id === 3)?.tasks || [];
  const done_tasks: Task[] =
    statuses.find((status: any) => status.id === 4)?.tasks || [];

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
