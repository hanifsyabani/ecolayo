import axios from "axios";

export async function GetAllOrders() {
  try {
    const response = await axios.get("/api/checkout/all", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}
