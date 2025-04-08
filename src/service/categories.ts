import axios from "axios";

export async function GetCategories() {

  try {
    const response = await axios.get(
      "/api/store/categories",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function GetCategoriesById(categoryid: string) {

  try {
    const response = await axios.get(
      `/api/store/categories/${categoryid}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (err: any) {
    throw new Error(err);
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
    throw new Error(error);
  }
}