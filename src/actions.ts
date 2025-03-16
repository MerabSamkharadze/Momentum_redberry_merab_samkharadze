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
