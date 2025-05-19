import axios from "axios";

export async function GetUsers() {
  try {
    const response = await axios.get("/api/store/users", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function GetUserById(id: string) {
  try {
    const response = await axios.get(`/api/store/users/${id} `, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function PostUser(data: any) {
  try {
    await axios.post("/api/store/users", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function PatchUser(id: string, data: any) {
  try {
    await axios.patch(`/api/store/users/${id}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function DeleteUser(id: string) {
  try {
    await axios.delete(`/api/store/users/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}


export async function GetOrdersByUser(id : string){
  try {
    const response = await axios.get(`/api/user/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}