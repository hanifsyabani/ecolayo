import axios from "axios";


export async function GetAllFeedback(){
  try {
    const response = await axios.get('/api/contact', {
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

export async function UpdateStatusFeedback(id:string) {
  try {
    await axios.patch(`/api/contact`, {id}, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function DeleteFeedback(id:string) {
  console.log(id)
  try {
    await axios.delete(`/api/contact/${id}`,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}