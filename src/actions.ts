export const fetchPriorities = async () => {
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

export const fetchStatuses = async () => {
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/statuses"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch statuses");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
  }
};
export const fetchDepartments = async () => {
  try {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
};
