import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/employees",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }

    const employees = await res.json();

    const formattedEmployees = employees.map((emp: any) => ({
      id: emp.id,
      name: `${emp.name} ${emp.surname}`,
    }));

    return NextResponse.json(formattedEmployees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}
