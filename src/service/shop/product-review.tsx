import axios from "axios";

export async function PostProductReview(
  data: any,
  productId: string,
  orderId: string
) {
  try {
    await axios.post(
      `/api/user/product-review?productId=${productId}&orderId=${orderId}`,
      data,
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

export async function GetReviewByUserId() {
  try {
    const response = await axios.get("/api/user/product-review", {
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

export async function GetAllReviewOneProduct(productId: string) {
  try {
    const response = await axios.get(
      `/api/store/products/review-user?productId=${productId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function PostLikeReview(id: string) {
  try {
    await axios.post(`/api/store/products/review-user?id=${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function DeleteLikeReview(id: string) {
  try {
    await axios.delete(`/api/store/products/review-user?id=${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export async function GetUserLikedReview(id: string) {
  try {
    const response = await axios.get(`/api/store/users/liked-review?id=${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data[0].LikedProductReview;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}
