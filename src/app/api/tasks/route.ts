import { NextResponse } from "next/server";
import { Task } from "@/components/TaskCard";

export async function GET() {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/tasks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await res.json();

    const statuses = [
      { id: 1, name: "დასაწყები", tasks: [] as Task[] },
      { id: 2, name: "პროგრესში", tasks: [] as Task[] },
      { id: 3, name: "მზად ტესტირებისთვის", tasks: [] as Task[] },
      { id: 4, name: "დასრულებული", tasks: [] as Task[] },
    ];

    tasks.forEach((task: Task) => {
      const statusObj = statuses.find((status) => status.id === task.status.id);
      if (statusObj) {
        statusObj.tasks.push(task);
      }
    });

    return NextResponse.json(statuses);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
