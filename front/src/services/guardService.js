export async function getGuards() {
    const res = await fetch("http://localhost:5000/api/guards");
    return res.json();
  }  