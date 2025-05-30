import axios from "axios";

export async function PostProductReview(data: any, productId: string, orderId :string) {
  try {
    await axios.post(`/api/user/product-review?productId=${productId}&orderId=${orderId}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" }
  }
}

export async function GetReviewByUserId(){
  try {
    const response = await axios.get('/api/user/product-review', {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    })

    return response.data
  } catch (error:any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}