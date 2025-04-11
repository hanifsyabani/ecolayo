import axios from "axios";
import { NextResponse } from "next/server";

export async function GetBanners() {
  try {
    const response = await axios.get("/api/store/banner", {
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

export async function GetBannerById(bannerid: string) {
  try {
    const response = await axios.get(`/api/store/banner/${bannerid}`, {
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

export async function DeleteBanner(bannerid: string) {
  try {
    await axios.delete(`/api/store/banner/${bannerid}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}
