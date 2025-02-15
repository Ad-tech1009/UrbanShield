const API_BASE_URL = "http://localhost:5000/api/guards";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your authentication system
});

// Fetch all guards
export async function getGuards() {
  try {
    const res = await fetch(API_BASE_URL, { headers: getHeaders() });
    return await res.json();
  } catch (error) {
    console.error("Error fetching guards:", error);
  }
}

// Request guard approval
export const requestGuardApproval = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/apply`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error submitting request:", error);
  }
};


