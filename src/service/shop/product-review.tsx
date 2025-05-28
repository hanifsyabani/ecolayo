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