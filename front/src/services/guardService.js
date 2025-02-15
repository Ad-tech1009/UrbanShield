export async function getGuards() {
    const res = await fetch("http://localhost:5000/api/guards");
    return res.json();
  }  

  export const requestGuardApproval = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/guard/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };
   