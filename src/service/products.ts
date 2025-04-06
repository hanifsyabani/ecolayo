import axios from "axios";

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
    throw new Error(err);
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
    throw new Error(error);
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
    throw new Error(error);
  }
}
