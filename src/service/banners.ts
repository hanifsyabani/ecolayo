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

export async function GetBannerById(bannerid: string) {

  try {
    const response = await axios.get(
      `/api/store/banner/${bannerid}`,
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

export async function DeleteBanner(bannerid: string) {
  try {
    await axios.delete(`/api/store/banner/${bannerid}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
}