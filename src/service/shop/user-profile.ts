import axios from "axios"

export async function GetUserProfile() {
  try {
    const response = await axios.get('/api/user/profile', {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
   })

    return response.data
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" }
  }
}