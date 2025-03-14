import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const task = await params.id;
  console.log(task);

  if (!task) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://momentum.redberryinternship.ge/api/tasks/${task}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error fetching comments: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "error to fetch comments on this task" },
      { status: 500 }
    );
  }
}
