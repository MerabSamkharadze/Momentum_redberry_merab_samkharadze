import { NextResponse } from "next/server";
import { Task } from "@/components/TaskCard";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const priorityFilter =
      searchParams.get("priority")?.split(",").map(Number) || [];
    const departmentFilter =
      searchParams.get("department")?.split(",").map(Number) || [];
    const employeeFilter =
      searchParams.get("employee")?.split(",").map(Number) || [];

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

    let tasks: Task[] = await res.json();

    if (priorityFilter.length > 0) {
      tasks = tasks.filter((task) =>
        priorityFilter.includes(task.priority?.id)
      );
    }
    if (departmentFilter.length > 0) {
      tasks = tasks.filter((task) =>
        departmentFilter.includes(task.department?.id)
      );
    }
    if (employeeFilter.length > 0) {
      tasks = tasks.filter((task) =>
        employeeFilter.includes(task.employee?.id)
      );
    }

    const statuses = [
      { id: 1, name: "დასაწყები", tasks: [] as Task[] },
      { id: 2, name: "პროგრესში", tasks: [] as Task[] },
      { id: 3, name: "მზად ტესტირებისთვის", tasks: [] as Task[] },
      { id: 4, name: "დასრულებული", tasks: [] as Task[] },
    ];

    tasks.forEach((task) => {
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
