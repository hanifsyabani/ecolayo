import axios from "axios";

export async function PatchLikedProduct(productid: string, isLiked: boolean) {
  try {
    await axios.patch(`/api/store/products/${productid}/liked-product`, {isLiked}, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}


export async function GetLikedProducts(productid: string) {
  try {
    const response = await axios.get(`/api/store/products/${productid}/liked-product`, {
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