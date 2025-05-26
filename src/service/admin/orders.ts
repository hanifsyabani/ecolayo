import axios from "axios";

export async function GetAllOrders() {
  try {
    const response = await axios.get("/api/checkout/all", {
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

export async function PatchStatusOrder(id: string, status: string, noteFromShop: string) {
  try {
     await axios.patch(
      `/api/checkout/${id}`,
      { status, noteFromShop },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}


export async function GetAllOrderOneProduct(id:string) {
  try {
    const response = await axios.get(`/api/checkout/order-one-product?id=${id}`, {
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