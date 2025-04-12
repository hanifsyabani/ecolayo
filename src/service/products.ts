import axios from "axios";
import { NextResponse } from "next/server";

export async function GetProducts() {
  try {
    const response = await axios.get("/api/store/products", {
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

export async function GetProductById(productid: string) {
  try {
    const response = await axios.get(`/api/store/products/${productid}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error:any) {
    
    throw error.response?.data || { error: "Something went wrong" };

  }
}

export async function DeleteProduct(productid: string) {
  try {
    await axios.delete(`/api/store/products/${productid}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}


export async function PostProduct(data: any) {
  try {
    await axios.post("/api/store/products", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function PatchProduct(productid: string, data: any) {
  try {
    await axios.patch(`/api/store/products/${productid}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}