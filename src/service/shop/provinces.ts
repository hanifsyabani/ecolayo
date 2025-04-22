import axios from "axios";

export async function GetProvinces() {
  try {
    const response = await axios.get('/api/region/provinces');
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}


export async function GetDistrictByProvince(provinceId: string) {
  try {
    const response = await axios.get(`/api/region/provinces/${provinceId}`);
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}



