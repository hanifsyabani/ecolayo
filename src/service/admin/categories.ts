import axios from "axios";

export async function GetCategories() {
  try {
    const response = await axios.get("/api/store/categories", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err: any) {
    throw err.response?.data || { error: "Something went wrong" };

  }
}

export async function GetCategoriesById(categoryid: string) {
  try {
    const response = await axios.get(`/api/store/categories/${categoryid}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err: any) {
    throw err.response?.data || { error: "Something went wrong" };

  }
}

export async function DeleteCategory(categoryid: string) {
  try {
    await axios.delete(`/api/store/categories/${categoryid}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };

  }
}


export async function PostCategory(data: any) {
  try {
    await axios.post("/api/store/categories", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function PatchCategory(categoryid: string, data: any) {
  try {
    await axios.patch(`/api/store/categories/${categoryid}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
} 