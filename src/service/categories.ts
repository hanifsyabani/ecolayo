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