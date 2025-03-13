import Comentars from "@/components/Comentars";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://momentum.redberryinternship.ge/api/tasks/${params.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
      },
    }
  );
  const task = await res.json();
  console.log(task);

  return (
    <div className="w-[1920px] h-[1550px] relative bg-white overflow-hidden">
      <div className="left-[121px] top-[140px] absolute inline-flex flex-col justify-start items-start gap-6">
        <div className="py-2.5 flex flex-col justify-start items-start gap-3">
          <div className="inline-flex justify-start items-center gap-4">
            <div
              data-property-1="Medium"
              className="px-[5px] py-1 bg-white rounded-[3px] outline-[0.50px] outline-offset-[-0.50px] outline-yellow-400 flex justify-start items-center gap-1"
            >
              <div className="w-4 h-5 relative overflow-hidden">
                <img
                  src={task.priority.icon}
                  alt={task.priority.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="justify-start text-yellow-400 text-base font-medium font-['FiraGO'] leading-normal">
                {task.priority.name}
              </div>
            </div>

            <div className="px-2.5 py-[5px] bg-pink-400 rounded-2xl flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-base font-normal font-['FiraGO']">
                {task.department.name}
              </div>
            </div>
          </div>

          <div className="justify-start text-neutral-800 text-4xl font-semibold font-['Inter']">
            {task.name}
          </div>
        </div>

        <div className="inline-flex justify-start items-center gap-2.5">
          <div className="w-[715px] justify-start text-black text-lg font-normal font-['FiraGO'] leading-relaxed">
            {task.description}
          </div>
        </div>
      </div>

      <div className="left-[121px] top-[442px] absolute inline-flex flex-col justify-start items-start gap-4">
        <div className="py-2.5 inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-zinc-800 text-2xl font-medium font-['FiraGO']">
            დავალების დეტალები
          </div>
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="h-16 py-2.5 inline-flex justify-start items-center gap-16">
            <div className="w-40 flex justify-start items-center gap-1.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-4 h-4 bg-green-400 rounded-full" />
              </div>
              <div className="justify-start text-zinc-700 text-base font-normal font-['FiraGO'] leading-normal">
                {task.status.name}
              </div>
            </div>
            <div
              data-property-1="Status"
              className="h-20 inline-flex flex-col justify-start items-start"
            >
              <div className="p-3.5 bg-white rounded-[5px] outline-1 outline-gray-300 inline-flex justify-start items-center gap-2.5">
                <div></div>
                <div className="inline-flex flex-col justify-start items-start">
                  <div className="relative">
                    <div className="relative">
                      <div className="outline-[1.50px] outline-offset-[-0.75px] outline-neutral-700" />
                      <div className="origin-top-left rotate-[3.14deg] opacity-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch h-16 py-3 inline-flex justify-start items-center gap-16">
            <div className="w-40 flex justify-start items-center gap-1.5">
              <div className="w-6 h-6 flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 px-1 py-[3px] inline-flex flex-col justify-start items-center gap-1 overflow-hidden">
                  <div className="w-2 h-2 outline-2 outline-offset-[-1px] outline-zinc-700" />
                  <div className="w-4 h-1.5 outline-2 outline-offset-[-1px] outline-zinc-700" />
                </div>
              </div>
              <div className="justify-start text-zinc-700 text-base font-normal font-['FiraGO'] leading-normal">
                {task.employee.name} {task.employee.surname}
              </div>
            </div>
            <div className="w-44 inline-flex flex-col justify-start items-end">
              <div className="inline-flex justify-end items-center gap-2.5">
                <div className="text-right justify-start text-zinc-700 text-xs font-light font-['FiraGO']">
                  დიზაინის დეპარტამენტი
                </div>
              </div>
              <div className="inline-flex justify-center items-center gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src={task.employee.avatar}
                  alt={task.employee.name}
                />
                <div className="flex justify-center items-center gap-2.5">
                  <div className="w-32 justify-start text-neutral-950 text-sm font-normal font-['FiraGO'] leading-tight">
                    {task.employee.department.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch h-16 py-2 inline-flex justify-start items-center gap-16">
            <div className="flex justify-start items-center gap-1.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-4 h-4 left-[3px] top-[4px] absolute outline-2 outline-offset-[-1px] outline-zinc-700" />
                <div className="w-0 h-1 left-[16px] top-[2px] absolute outline-2 outline-offset-[-1px] outline-zinc-700" />
                <div className="w-0 h-1 left-[8px] top-[2px] absolute outline-2 outline-offset-[-1px] outline-zinc-700" />
                <div className="w-4 h-0 left-[3px] top-[10px] absolute outline-2 outline-offset-[-1px] outline-zinc-700" />
              </div>
              <div className="justify-start text-zinc-700 text-base font-normal font-['FiraGO'] leading-normal">
                დავალების ვადა
              </div>
            </div>
            <div className="w-28 flex justify-center items-center gap-2.5">
              <div className="justify-start text-neutral-950 text-sm font-normal font-['FiraGO'] leading-tight">
                {new Date(task.due_date).toLocaleDateString("ka-GE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comentars />
    </div>
  );
}
