import axios from "axios";

export async function Register(data:any){
  try {
    await axios.post("/api/auth/register", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}