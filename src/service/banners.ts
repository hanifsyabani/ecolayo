import axios from "axios";

export async function GetBanners() {

  try {
    const response = await axios.get(
      "/api/store/banner",
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