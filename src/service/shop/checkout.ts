import axios from "axios";

export async function PostCheckout(data:any){
  try {
    await axios.post('/api/checkout', data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
    
  }
}