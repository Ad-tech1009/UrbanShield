const API_BASE_URL = "http://localhost:5000";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored in localStorage or cookies
});

// Fetch all unverified guards
export const getUnverifiedGuards = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/police/approves`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch unverified guards");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching unverified guards:", error);
    return [];
  }
};

export const verifyGuard = async (guardId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/police/verify`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status: "Approved" }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to verify guard");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error verifying guard:", error);
      return null;
    }
  };