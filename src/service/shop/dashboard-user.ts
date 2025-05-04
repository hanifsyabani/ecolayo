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

export async function PatchUserProfile(data:any){
  try {
    await axios.patch('/api/user/profile', data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" }
  }
}

export async function PatchPassword(data:any){
  try {
    await axios.patch('/api/user/profile', data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" }
  }
}

export async function PostShippingAddress(data:any){
  try {
    console.log(data)
    await axios.post('/api/user/shipping-address', data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" }
  }
}


export async function PatchShippingAddress(data:any){
  try {
    await axios.patch('/api/user/shipping-address', data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" }
  }
}


export async function GetShippingAddress() {
  try {
    const response = await axios.get('/api/user/shipping-address', {
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
