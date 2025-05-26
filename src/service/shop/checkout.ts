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

export async function GetAllOrdersOneUser(){
  try {
    const response = await axios.get('/api/checkout', {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}


export default async function GetOrderById(id: string) {
  try {
    const response = await axios.get(`/api/checkout/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

