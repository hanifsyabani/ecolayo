import axios from "axios";

export async function PatchStore(data:any){
  try {
    await axios.patch("/api/store/setting", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
    
  }
}

export async function GetStore(){

  try {
    const response = await axios.get('/api/store/setting',{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.data[0]
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}